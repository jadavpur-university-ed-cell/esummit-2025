import { prisma } from '@/prisma/client';

export interface NotificationData {
  title: string;
  description: string;
}

export interface PaginatedNotifications {
  notifications: Notification[];
  prev?: {
    page: number;
    limit: number;
  };
  next?: {
    page: number;
    limit: number;
  };
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  read: boolean;
}

class NotificationService {
  constructor() {}

  async addNotificationToUser(userId: string, title: string, description: string): Promise<Notification> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { notifications: true }
      });

      if (!user) throw new Error('User not found');

      const notification = await prisma.notification.create({
        data: {
          title,
          description,
          userId: userId,
        },
      });

      return notification;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to add notification');
    }
  }

  async markNotificationAsReadById(userId: string, notificationId: string): Promise<Notification> {
    try {
      const notification = await prisma.notification.findFirst({
        where: {
          id: notificationId,
          userId: userId,
        },
      });

      if (!notification) throw new Error('Notification not found');

      const updatedNotification = await prisma.notification.update({
        where: { id: notificationId },
        data: { read: true },
      });

      return updatedNotification;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to mark notification as read');
    }
  }

  async markAllNotificationsAsRead(userId: string): Promise<{ count: number }> {
    try {
      const result = await prisma.notification.updateMany({
        where: {
          userId: userId,
          read: false,
        },
        data: { read: true },
      });

      return { count: result.count };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to mark all notifications as read');
    }
  }

  async listAllNotificationsByUserId(userId: string): Promise<Notification[]> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          notifications: {
            orderBy: { createdAt: 'desc' }
          }
        }
      });

      if (!user) throw new Error('User not found');

      return user.notifications;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch notifications');
    }
  }

  async getUnreadNotificationsCount(userId: string): Promise<number> {
    try {
      const count = await prisma.notification.count({
        where: {
          userId: userId,
          read: false,
        },
      });

      return count;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to get unread notifications count');
    }
  }

  async paginatedListing(userId: string, page: number, limit: number): Promise<PaginatedNotifications> {
    try {
      const result: PaginatedNotifications = {
        notifications: [],
      };

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          notifications: {
            orderBy: { createdAt: 'desc' }
          }
        }
      });

      if (!user || !user.notifications) {
        return result;
      }

      const totalNotifications = user.notifications.length;

      if (startIndex > 0) {
        result.prev = {
          page: page - 1,
          limit: limit,
        };
      }

      if (endIndex < totalNotifications) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }

      result.notifications = user.notifications.slice(startIndex, endIndex);
      return result;
    } catch (error) {
      console.error('Error in paginatedListing:', error);
      return { notifications: [] };
    }
  }

  async deleteNotification(userId: string, notificationId: string): Promise<boolean> {
    try {
      const notification = await prisma.notification.findFirst({
        where: {
          id: notificationId,
          userId: userId,
        },
      });

      if (!notification) throw new Error('Notification not found');

      await prisma.notification.delete({
        where: { id: notificationId },
      });

      return true;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to delete notification');
    }
  }

  async clearAllNotifications(userId: string): Promise<{ count: number }> {
    try {
      const result = await prisma.notification.deleteMany({
        where: { userId: userId },
      });

      return { count: result.count };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to clear all notifications');
    }
  }
}

export const notificationService = new NotificationService();