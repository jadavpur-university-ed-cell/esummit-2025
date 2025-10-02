'use server'
import { prisma } from '@/prisma/client';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { notificationService } from '@/lib/services/notifications';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const DEVELOPER_COUPON_CODE = process.env.NEXT_PUBLIC_DEVELOPER_COUPON_CODE;
const DEVELOPER_PRICE = parseInt(process.env.NEXT_PUBLIC_DEVELOPER_PRICE || '50');

export async function createMerchandiseOrder(paymentData: {
  amount: number;
  currency: string;
//   merchandise: 'SHIRT' | 'CAP';
  merchandise: 'SHIRT';
  size: string;
  couponCode?: string;
  userId: string;
}) {
  try {
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

    const options = {
      amount: Math.round(finalAmount * 100),
      currency,
      receipt: `receipt_${Date.now()}_${merchandise}`,
      notes: {
        merchandise,
        size,
        couponApplied: couponApplied.toString(),
        originalAmount: amount.toString(),
        userId,
      },
    };

    const order = await razorpay.orders.create(options);

    // Store order in database
    await prisma.merchandiseOrder.create({
      data: {
        orderId: order.id,
        amount: finalAmount,
        currency: order.currency,
        receipt: order.receipt,
        merchandise,
        size,
        couponUsed: couponApplied,
        couponCode: couponApplied ? couponCode : null,
        status: 'created',
        userId: userId,
      },
    });

    return { success: true, data: order };
  } catch (error) {
    console.error('Error creating order:', error);
    return { error: 'Failed to create order' };
  }
}

// export async function verifyMerchandisePayment(verificationData: {
//   razorpay_order_id: string;
//   razorpay_payment_id: string;
//   razorpay_signature: string;
//   // merchandise: 'SHIRT' | 'CAP';
//   merchandise: 'SHIRT';
//   size: string;
//   couponCode?: string;
//   userId: string;
// }) {
  // try {
  //   const { 
  //     razorpay_order_id, 
  //     razorpay_payment_id, 
  //     razorpay_signature,
  //     merchandise,
  //     size,
  //     couponCode,
  //     userId
  //   } = verificationData;

  //   const body = razorpay_order_id + "|" + razorpay_payment_id;
  //   const expectedSignature = crypto
  //     .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
  //     .update(body)
  //     .digest('hex');

  //   const isValid = expectedSignature === razorpay_signature;

//     if (isValid) {
//       // Update payment status in database
//       await prisma.merchandiseOrder.update({
//         where: { orderId: razorpay_order_id },
//         data: {
//           status: 'paid',
//           paymentId: razorpay_payment_id,
//         //   merchandise,  add when cap is added
//           merchandise: 'SHIRT',
//           size,
//           couponUsed: !!couponCode,
//           couponCode: couponCode || null,
//         },
//       });

//       // Update user's shirt size when they purchase a shirt
//       if (merchandise === 'SHIRT') {
//         await prisma.user.update({
//           where: { id: userId },
//           data: {
//             shirtSize: size,
//           },
//         });
//       }

//       return { success: true, message: 'Payment verified successfully' };
//     } else {
//       // Update payment status to failed
//       await prisma.merchandiseOrder.update({
//         where: { orderId: razorpay_order_id },
//         data: {
//           status: 'failed',
//         },
//       });

//       return { error: 'Payment signature verification failed' };
//     }
//   } catch (error) {
//     console.error('Error verifying payment:', error);
//     return { error: 'Internal server error while verifying payment' };
//   }
// }

export async function verifyMerchandisePayment(verificationData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  merchandise: 'SHIRT';
  size: string;
  couponCode?: string;
  userId: string;
}) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      merchandise,
      size,
      couponCode,
      userId
    } = verificationData;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (isValid) {
      // Update payment status in DB
      await prisma.merchandiseOrder.update({
        where: { orderId: razorpay_order_id },
        data: {
          status: 'paid',
          paymentId: razorpay_payment_id,
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
        "Payment Verified Successfully ",
        "We have confirmed your merchandise order. It is now being processed and will be shipped shortly."
      );

      return { success: true, message: 'Payment verified successfully' };
    } else {
      await prisma.merchandiseOrder.update({
        where: { orderId: razorpay_order_id },
        data: { status: 'failed' },
      });

      await notificationService.addNotificationToUser(
        userId,
        "Payment Not Verified",
        "Contact merchandise POC for further queries"
      );

      return { error: 'Payment signature verification failed' };
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return { error: 'Internal server error while verifying payment' };
  }
}