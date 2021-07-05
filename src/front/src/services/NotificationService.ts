import axios from "../services/Axios";
import { NotificationResponse } from "../../api/responses";
import { StatusCodes } from "../../api/models";

export class NotificationService {
  async getNotifications(
    userId: string,
    skip: number,
    take: number
  ): Promise<NotificationResponse[] | undefined> {
    try {
      const response = await axios.get(
        `/notifications/user/${userId}?skip=${skip}&take=${take}`
      );
      if (response.status == StatusCodes.Success) {
        const notifications: NotificationResponse[] = [];
        for (let item of response.data) {
          notifications.push(item);
        }
        return notifications;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async markAllAsRead(userId: string): Promise<string | undefined> {
    try {
      const response = await axios.post(`/notifications/markAsRead/${userId}`);
      if (response.status == StatusCodes.Success) {
        return "OK";
      }
    } catch (error) {
      new Error(error);
    }
  }
}
