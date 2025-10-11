'use server'
import { prisma } from '@/prisma/client';
import { notificationService } from '@/lib/services/notifications';

// Keep all interfaces the same...
interface CashfreePayment {
  payment_status: string;
  cf_payment_id: string;
  payment_amount?: number;
  payment_currency?: string;
  payment_time?: string;
  payment_completion_time?: string;
  payment_method?: string;
}

interface ErrorWithResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const isErrorWithResponse = (error: unknown): error is ErrorWithResponse => {
  return typeof error === 'object' && error !== null && 'response' in error;
};

const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string';
};

// FIXED: Use direct HTTP approach instead of SDK configuration
let cashfreeConfig: {
  clientId: string;
  clientSecret: string;
  environment: string;
} | null = null;

try {
  const clientId = process.env.CASHFREE_CLIENT_ID;
  const clientSecret = process.env.CASHFREE_CLIENT_SECRET;
  const environment = process.env.CASHFREE_ENVIRONMENT || 'SANDBOX';
  
  console.log('🔍 FULL CLIENT ID LOADED:', clientId);
  console.log('🔍 SECRET EXISTS:', !!clientSecret);
  console.log('🔍 ENVIRONMENT:', environment);
  
  if (!clientId || !clientSecret) {
    throw new Error('Missing Cashfree credentials');
  }
  
  cashfreeConfig = {
    clientId,
    clientSecret,
    environment
  };
  
  console.log('✅ Cashfree config created successfully');
  console.log('📋 Client ID (first 10 chars):', clientId.substring(0, 10));
  
} catch (error) {
  console.error('❌ Failed to initialize Cashfree config:', error);
  cashfreeConfig = null;
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
    
    if (!cashfreeConfig) {
      console.error('❌ Cashfree config not initialized');
      return { error: 'Payment service not available - Cashfree not initialized' };
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
        return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/merchandise?order_id={order_id}`,
        notify_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/cashfree-webhook`
      },
      order_note: `${merchandise} - Size: ${size}${couponApplied ? ' (Coupon Applied)' : ''}`
    };

    console.log('📦 Cashfree request object:', JSON.stringify(request, null, 2));
    console.log('🔑 Using credentials - ID first 10:', cashfreeConfig.clientId.substring(0, 10));

    // FIXED: Use direct fetch with proper headers instead of SDK
    const apiUrl = cashfreeConfig.environment === 'PRODUCTION' 
      ? 'https://api.cashfree.com/pg/orders'
      : 'https://sandbox.cashfree.com/pg/orders';

    console.log('🚀 Making direct API call to:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-client-id': cashfreeConfig.clientId,
        'x-client-secret': cashfreeConfig.clientSecret,
        'x-api-version': '2023-08-01'
      },
      body: JSON.stringify(request)
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log('📬 Cashfree response received:', result);
    
    if (!result || !result.order_id) {
      console.error('❌ Invalid response from Cashfree:', result);
      return { error: 'Failed to create order with payment gateway' };
    }

    console.log('✅ Order created successfully:', result.order_id);

    // Store order in database
    await prisma.merchandiseOrder.create({
      data: {
        orderId: result.order_id,
        amount: finalAmount,
        currency: result.order_currency || 'INR',
        receipt: orderId,
        merchandise,
        size,
        couponUsed: couponApplied,
        couponCode: couponApplied ? couponCode : null,
        status: 'created',
        userId: userId,
        paymentId: result.payment_session_id,
      },
    });

    console.log('💾 Order saved to database');

    return { 
      success: true, 
      data: {
        orderId: result.order_id,
        paymentSessionId: result.payment_session_id,
        amount: finalAmount
      }
    };
  } catch (error: unknown) {
    console.error('💥 Error creating order:', error);
    
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

// Keep the other functions the same for now - we'll update them once this works
export async function verifyMerchandisePayment(verificationData: {
  order_id: string;
  merchandise: 'SHIRT';
  size: string;
  couponCode?: string;
  userId: string;
}) {
  try {
    if (!cashfreeConfig) {
      return { error: 'Payment service not available' };
    }

    const { order_id, merchandise, size, couponCode, userId } = verificationData;

    const apiUrl = cashfreeConfig.environment === 'PRODUCTION'
      ? `https://api.cashfree.com/pg/orders/${order_id}/payments`
      : `https://sandbox.cashfree.com/pg/orders/${order_id}/payments`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-client-id': cashfreeConfig.clientId,
        'x-client-secret': cashfreeConfig.clientSecret,
        'x-api-version': '2023-08-01'
      }
    });

    if (!response.ok) {
      return { error: 'Failed to fetch payment details' };
    }

    const result = await response.json();
    const payments: CashfreePayment[] = result;

    if (!payments || payments.length === 0) {
      return { error: 'No payments found for this order' };
    }

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
      const pendingPayment = payments.find((payment: CashfreePayment) => 
        payment.payment_status === "PENDING"
      );

      if (pendingPayment) {
        return { error: 'Payment is still pending. Please wait for confirmation.' };
      }

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
    if (!cashfreeConfig) {
      return { error: 'Payment service not available' };
    }

    const order = await prisma.merchandiseOrder.findFirst({
      where: {
        orderId: orderId,
        userId: userId
      }
    });

    if (!order) {
      return { error: 'Order not found or unauthorized' };
    }

    if (order.status === 'paid') {
      return { success: true, status: 'paid', message: 'Order is confirmed and paid' };
    }

    const apiUrl = cashfreeConfig.environment === 'PRODUCTION'
      ? `https://api.cashfree.com/pg/orders/${orderId}/payments`
      : `https://sandbox.cashfree.com/pg/orders/${orderId}/payments`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-client-id': cashfreeConfig.clientId,
        'x-client-secret': cashfreeConfig.clientSecret,
        'x-api-version': '2023-08-01'
      }
    });

    if (!response.ok) {
      return { success: true, status: order.status, message: 'Unable to fetch latest status' };
    }

    const payments: CashfreePayment[] = await response.json();

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
