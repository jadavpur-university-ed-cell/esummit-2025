'use server'
import { prisma } from '@/prisma/client';
import { notificationService } from '@/lib/services/notifications';

// Add interface for Cashfree payment object
interface CashfreePayment {
  payment_status: string;
  cf_payment_id: string;
  payment_amount?: number;
  payment_currency?: string;
  payment_time?: string;
  payment_completion_time?: string;
  payment_method?: string;
}

// Interface for error with response (like Axios errors)
interface ErrorWithResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// Type guard to check if error has response property
const isErrorWithResponse = (error: unknown): error is ErrorWithResponse => {
  return typeof error === 'object' && error !== null && 'response' in error;
};

// Type guard to check if error has message property
const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string';
};

// Correct Cashfree SDK initialization
let cashfree: any;

try {
  const { Cashfree } = require('cashfree-pg');
  
  const clientId = process.env.CASHFREE_CLIENT_ID;
  const clientSecret = process.env.CASHFREE_CLIENT_SECRET;
  const environment = process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'SANDBOX';
  
  console.log('Initializing Cashfree with:');
  console.log('Client ID (first 6 chars):', clientId?.substring(0, 6));
  console.log('Environment:', environment);
  
  if (!clientId || !clientSecret) {
    throw new Error('Missing Cashfree credentials');
  }
  
  cashfree = new Cashfree(environment, clientId, clientSecret);
  
} catch (error) {
  console.error('Failed to initialize Cashfree SDK:', error);
}

const DEVELOPER_COUPON_CODE = process.env.NEXT_PUBLIC_DEVELOPER_COUPON_CODE;
const DEVELOPER_PRICE = parseInt(process.env.NEXT_PUBLIC_DEVELOPER_PRICE || '50');

export async function createMerchandiseOrder(paymentData: {
  amount: number;
  currency: string;
  merchandise: 'SHIRT';
  size: string;
  couponCode?: string;
  userId: string;
}) {
  try {
    if (!cashfree) {
      console.error('Cashfree not initialized');
      return { error: 'Payment service not available' };
    }

    const { amount, currency, merchandise, size, couponCode, userId } = paymentData;

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return { error: 'User not found' };
    }

    // Validate coupon code
    let finalAmount = amount;
    let couponApplied = false;

    if (couponCode && couponCode === DEVELOPER_COUPON_CODE) {
      finalAmount = DEVELOPER_PRICE;
      couponApplied = true;
    }

    // Generate unique order ID
    const orderId = `order_${Date.now()}_${merchandise}_${userId.slice(-4)}`;

    // Create Cashfree order request
    const request = {
      order_amount: finalAmount,
      order_currency: currency || 'INR',
      order_id: orderId,
      customer_details: {
        customer_id: userId,
        customer_phone: user.phone || "9999999999",
        customer_name: user.name || "Customer",
        customer_email: user.email || "customer@example.com"
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/merchandise?order_id={order_id}`
      },
      order_note: `${merchandise} - Size: ${size}${couponApplied ? ' (Coupon Applied)' : ''}`
    };

    console.log('Creating order with request:', JSON.stringify(request, null, 2));

    // Create order with Cashfree
    const response = await cashfree.PGCreateOrder(request);
    
    if (!response || !response.data) {
      return { error: 'Failed to create order with payment gateway' };
    }

    const order = response.data;

    // Store order in database
    await prisma.merchandiseOrder.create({
      data: {
        orderId: order.order_id,
        amount: finalAmount,
        currency: order.order_currency,
        receipt: orderId,
        merchandise,
        size,
        couponUsed: couponApplied,
        couponCode: couponApplied ? couponCode : null,
        status: 'created',
        userId: userId,
        paymentId: order.payment_session_id,
      },
    });

    return { 
      success: true, 
      data: {
        orderId: order.order_id,
        paymentSessionId: order.payment_session_id,
        amount: finalAmount
      }
    };
  } catch (error: unknown) {
    console.error('Error creating order:', error);
    
    // Properly handle unknown error type
    let errorMessage = 'Unknown error occurred';
    let errorDetails = '';
    
    if (isErrorWithResponse(error)) {
      errorDetails = error.response?.data?.message || (isErrorWithMessage(error) ? error.message : '');
      errorMessage = errorDetails || errorMessage;
    } else if (isErrorWithMessage(error)) {
      errorMessage = error.message;
      errorDetails = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
      errorDetails = error;
    }
    
    console.error('Error details:', errorDetails);
    return { error: 'Failed to create order: ' + errorMessage };
  }
}

export async function verifyMerchandisePayment(verificationData: {
  order_id: string;
  merchandise: 'SHIRT';
  size: string;
  couponCode?: string;
  userId: string;
}) {
  try {
    if (!cashfree) {
      return { error: 'Payment service not available' };
    }

    const { order_id, merchandise, size, couponCode, userId } = verificationData;

    // Fetch payment details from Cashfree
    const response = await cashfree.PGOrderFetchPayments(order_id);
    
    if (!response || !response.data) {
      return { error: 'Failed to fetch payment details' };
    }

    const payments: CashfreePayment[] = response.data;

    if (!payments || payments.length === 0) {
      return { error: 'No payments found for this order' };
    }

    // Check payment status - now with proper typing
    const successfulPayment = payments.find((payment: CashfreePayment) => 
      payment.payment_status === "SUCCESS"
    );

    if (successfulPayment) {
      // Update payment status in DB
      await prisma.merchandiseOrder.update({
        where: { orderId: order_id },
        data: {
          status: 'paid',
          paymentId: successfulPayment.cf_payment_id,
          merchandise: 'SHIRT',
          size,
          couponUsed: !!couponCode,
          couponCode: couponCode || null,
        },
      });

      // Update user's shirt size
      if (merchandise === 'SHIRT') {
        await prisma.user.update({
          where: { id: userId },
          data: { shirtSize: size },
        });
      }

      await notificationService.addNotificationToUser(
        userId,
        "Payment Verified Successfully",
        "We have confirmed your merchandise order. It is now being processed and will be shipped shortly."
      );

      return { success: true, message: 'Payment verified successfully' };
    } else {
      // Check if payment is pending - with proper typing
      const pendingPayment = payments.find((payment: CashfreePayment) => 
        payment.payment_status === "PENDING"
      );

      if (pendingPayment) {
        return { error: 'Payment is still pending. Please wait for confirmation.' };
      }

      // Payment failed
      await prisma.merchandiseOrder.update({
        where: { orderId: order_id },
        data: { status: 'failed' },
      });

      await notificationService.addNotificationToUser(
        userId,
        "Payment Not Verified",
        "Your payment could not be verified. Contact merchandise POC for further queries."
      );

      return { error: 'Payment not successful' };
    }
  } catch (error: unknown) {
    console.error('Error verifying payment:', error);
    
    let errorMessage = 'Internal server error while verifying payment';
    if (isErrorWithMessage(error)) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    return { error: errorMessage };
  }
}

export async function checkOrderStatus(orderId: string, userId: string) {
  try {
    if (!cashfree) {
      return { error: 'Payment service not available' };
    }

    // Verify user owns the order
    const order = await prisma.merchandiseOrder.findFirst({
      where: {
        orderId: orderId,
        userId: userId
      }
    });

    if (!order) {
      return { error: 'Order not found or unauthorized' };
    }

    // If order is already marked as paid, return success
    if (order.status === 'paid') {
      return { success: true, status: 'paid', message: 'Order is confirmed and paid' };
    }

    // Check with Cashfree for latest status
    const response = await cashfree.PGOrderFetchPayments(orderId);
    
    if (!response || !response.data) {
      return { success: true, status: order.status, message: 'Unable to fetch latest status' };
    }

    const payments: CashfreePayment[] = response.data;

    if (!payments || payments.length === 0) {
      return { success: true, status: order.status, message: 'No payments found' };
    }

    const latestPayment = payments[0];
    
    return { 
      success: true, 
      status: latestPayment.payment_status.toLowerCase(),
      message: `Payment status: ${latestPayment.payment_status}`
    };

  } catch (error: unknown) {
    console.error('Error checking order status:', error);
    
    let errorMessage = 'Failed to check order status';
    if (isErrorWithMessage(error)) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    return { error: errorMessage };
  }
}
