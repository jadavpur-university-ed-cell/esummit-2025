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

// FIXED: Correct Cashfree SDK import and initialization
let Cashfree: any;

try {
  // Try different import methods to find the correct one
  const cashfreePG = require('cashfree-pg');
  
  // Check what's available in the package
  console.log('📦 Available cashfree-pg exports:', Object.keys(cashfreePG));
  
  // Try different possible export names
  Cashfree = cashfreePG.Cashfree || cashfreePG.CFPaymentGateway || cashfreePG.default || cashfreePG;
  
  const clientId = process.env.CASHFREE_CLIENT_ID;
  const clientSecret = process.env.CASHFREE_CLIENT_SECRET;
  const environment = process.env.CASHFREE_ENVIRONMENT || 'PRODUCTION';
  
  console.log('🚀 Initializing Cashfree:');
  console.log('📋 Client ID (first 6 chars):', clientId?.substring(0, 6));
  console.log('🔑 Client Secret exists:', !!clientSecret);
  console.log('🌍 Environment:', environment);
  console.log('📦 Cashfree object type:', typeof Cashfree);
  console.log('📦 Available methods:', Object.getOwnPropertyNames(Cashfree));
  
  if (!clientId || !clientSecret) {
    throw new Error('Missing Cashfree credentials - CLIENT_ID or CLIENT_SECRET is undefined');
  }
  
  // Initialize using the static property method
  if (Cashfree && typeof Cashfree === 'object') {
    Cashfree.XClientId = clientId;
    Cashfree.XClientSecret = clientSecret;
    Cashfree.XEnvironment = environment;
    
    console.log('✅ Cashfree configured successfully with static properties');
  } else {
    throw new Error('Cashfree SDK not properly loaded');
  }
  
} catch (error) {
  console.error('❌ Failed to initialize Cashfree SDK:', error);
  Cashfree = null;
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
    console.log('🛍️ Starting merchandise order creation:', paymentData);
    
    if (!Cashfree) {
      console.error('❌ Cashfree SDK not initialized');
      return { error: 'Payment service not available - Cashfree not initialized' };
    }

    // Check if PGCreateOrder method exists
    if (typeof Cashfree.PGCreateOrder !== 'function') {
      console.error('❌ PGCreateOrder method not found. Available methods:', Object.getOwnPropertyNames(Cashfree));
      return { error: 'Payment method not available' };
    }

    const { amount, currency, merchandise, size, couponCode, userId } = paymentData;

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      console.error('❌ User not found:', userId);
      return { error: 'User not found' };
    }

    console.log('👤 User found:', user.email);

    // Validate coupon code
    let finalAmount = amount;
    let couponApplied = false;

    if (couponCode && couponCode === DEVELOPER_COUPON_CODE) {
      finalAmount = DEVELOPER_PRICE;
      couponApplied = true;
      console.log('🎫 Coupon applied, new amount:', finalAmount);
    }

    // Generate unique order ID
    const orderId = `order_${Date.now()}_${merchandise}_${userId.slice(-4)}`;
    console.log('🆔 Generated order ID:', orderId);

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
        return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://esummit.juecell.com'}/merchandise?order_id={order_id}`,
        notify_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://esummit.juecell.com'}/api/cashfree-webhook`
      },
      order_note: `${merchandise} - Size: ${size}${couponApplied ? ' (Coupon Applied)' : ''}`
    };

    console.log('📦 Cashfree request object:', JSON.stringify(request, null, 2));

    // Try different method call patterns
    console.log('🚀 Attempting to call PGCreateOrder...');
    let response;
    
    try {
      // Method 1: With version parameter
      response = await Cashfree.PGCreateOrder("2023-08-01", request);
    } catch (error1) {
      console.log('❌ Method 1 failed, trying Method 2...');
      try {
        // Method 2: Without version parameter
        response = await Cashfree.PGCreateOrder(request);
      } catch (error2) {
        console.log('❌ Method 2 failed, trying Method 3...');
        try {
          // Method 3: Alternative method name
          response = await Cashfree.CreateOrder(request);
        } catch (error3) {
          console.error('❌ All methods failed:', { error1, error2, error3 });
          throw error1; // Throw the first error
        }
      }
    }
    
    console.log('📬 Cashfree response received:', !!response);
    console.log('📬 Response data exists:', !!response?.data);
    
    if (!response || !response.data) {
      console.error('❌ Invalid response from Cashfree:', response);
      return { error: 'Failed to create order with payment gateway' };
    }

    const order = response.data;
    console.log('✅ Order created successfully:', order.order_id);

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

    console.log('💾 Order saved to database');

    return { 
      success: true, 
      data: {
        orderId: order.order_id,
        paymentSessionId: order.payment_session_id,
        amount: finalAmount
      }
    };
  } catch (error: unknown) {
    console.error('💥 Error creating order:', error);
    
    // Properly handle unknown error type
    let errorMessage = 'Unknown error occurred';
    let errorDetails = '';
    
    if (isErrorWithResponse(error)) {
      console.error('📡 API Error Response:', error.response);
      errorDetails = error.response?.data?.message || (isErrorWithMessage(error) ? error.message : '');
      errorMessage = errorDetails || errorMessage;
    } else if (isErrorWithMessage(error)) {
      errorMessage = error.message;
      errorDetails = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
      errorDetails = error;
    }
    
    console.error('🔍 Error details:', errorDetails);
    return { error: 'Failed to create order: ' + errorMessage };
  }
}

// Keep the other functions (verifyMerchandisePayment, checkOrderStatus) the same for now
// We'll update them once we confirm this fix works

export async function verifyMerchandisePayment(verificationData: {
  order_id: string;
  merchandise: 'SHIRT';
  size: string;
  couponCode?: string;
  userId: string;
}) {
  try {
    if (!Cashfree) {
      return { error: 'Payment service not available' };
    }

    const { order_id, merchandise, size, couponCode, userId } = verificationData;

    // Use same fallback method pattern for fetching payments
    let response;
    try {
      response = await Cashfree.PGOrderFetchPayments("2023-08-01", order_id);
    } catch (error1) {
      try {
        response = await Cashfree.PGOrderFetchPayments(order_id);
      } catch (error2) {
        throw error1;
      }
    }
    
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
    if (!Cashfree) {
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

    // Use same fallback method pattern
    let response;
    try {
      response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
    } catch (error1) {
      try {
        response = await Cashfree.PGOrderFetchPayments(orderId);
      } catch (error2) {
        throw error1;
      }
    }
    
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
