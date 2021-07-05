import { NotificationService } from "./../services";
import { NotificationResponse } from "api/responses";
import { defineStore } from "pinia";

const notificationService = new NotificationService();

import { message } from "ant-design-vue";

export const useNotificationStore = defineStore({
  // name of the store
  // it is used in devtools and allows restoring state
  id: "notification",
  // a function that returns a fresh state
  state: () => ({
    notifications: [] as NotificationResponse[],
    loading: false,
    skip: 0,
    take: 20
  }),
  // optional getters
  getters: {
    unreadNotifications(): number {
      const unread = this.notifications.filter(n => n.readAt === null);
      return unread.length;
    }
  },
  // optional actions
  actions: {
    async loadNotifications(userId: string) {
      try {
        this.loading = true;
        const notifications = await notificationService.getNotifications(
          userId,
          this.skip,
          this.take
        );

        if (notifications) {
          this.notifications = notifications;
        }
      } catch (error) {
        message.error(error.data);
      } finally {
        this.loading = false;
      }
    },
    async markAsRead(userId: string) {
      try {
        const response = await notificationService.markAllAsRead(userId);
        if (response) {
          this.notifications.forEach(notif => {
            notif.readAt = new Date();
          });
        }
      } catch (error) {
        message.error(error.data);
      }
    }
  }
});
