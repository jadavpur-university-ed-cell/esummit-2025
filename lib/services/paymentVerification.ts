'use server';

import { notificationService } from './notifications';
import { prisma } from '@/prisma/client';

export async function addPaymentNotification(userId: string, isVerified: boolean) {
  const verifiedBody = {
    title: "Payment Verified Successfully",
    description: "We have confirmed your merchandise order. It is now being processed and will be shipped shortly.",
  };

  const notVerifiedBody = {
    title: "Payment Not Verified",
    description: "Contact Logistics team for further queries",
  };

  try {
    if (isVerified) {
      await notificationService.addNotificationToUser(
        userId,
        verifiedBody.title,
        verifiedBody.description
      );
    } else {
      await notificationService.addNotificationToUser(
        userId,
        notVerifiedBody.title,
        notVerifiedBody.description
      );
    }
  } catch (error) {
    console.error("Could not add notification:", error);
    throw error;
  }
}

// For bulk operations (admin only)
export async function sendBulkPaymentNotifications(users: Array<{
  email: string;
  size: string;
  isVerified: boolean;
}>) {
  const results = [];

  for (const user of users) {
    console.log(`\n\n--- sending notification to ${user.email} ---`);
    
    try {
      const userData = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!userData) {
        console.log(`User not found: ${user.email}`);
        continue;
      }

      // Update user merchandise status if needed
      await updateUserMerchandise(userData.id, user.size, user.isVerified);
      
      // Add notification
      await addPaymentNotification(userData.id, user.isVerified);
      
      console.log(`Added notification and updated status for ${user.email}`);
      results.push({ email: user.email, success: true });
    } catch (error) {
      console.error(`Error while adding notification for ${user.email}:`, error);
      results.push({ email: user.email, success: false, error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  return results;
}

async function updateUserMerchandise(userId: string, size: string, isVerified: boolean) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { merchandiseOrders: true }
    });

    if (!user) {
      console.log("User not found!");
      return;
    }

    const status = isVerified ? "paid" : "failed";
    let sendNotification = false;

    // Update merchandise orders
    const latestOrder = user.merchandiseOrders
      .filter(order => order.size === size && order.status === 'created')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

    if (latestOrder) {
      await prisma.merchandiseOrder.update({
        where: { id: latestOrder.id },
        data: { status: status },
      });
      
      console.log("Merchandise order updated in db");
      sendNotification = true;
    }

    // Update user's shirt size if verified and purchasing a shirt
    if (isVerified && latestOrder?.merchandise === 'SHIRT') {
      await prisma.user.update({
        where: { id: userId },
        data: { shirtSize: size },
      });
    }

    if (!sendNotification) {
      console.log("Did not find matching merchandise order in db");
    }
  } catch (error) {
    console.error("Error updating merchandise in db:", error);
    throw error;
  }
}