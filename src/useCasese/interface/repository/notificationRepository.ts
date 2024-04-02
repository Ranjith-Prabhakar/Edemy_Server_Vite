import { ICourse } from "../../../entities/course";
import { INotificationResponse } from "../request_And_Response/notification";

export interface INotificationRepository {
  addNotification(
    userId: string,
    key: string,
    value?: ICourse
  ): Promise<boolean | void>;
  getNotifications(userId: string): Promise<INotificationResponse | void>;
  updateNotifications(
    notificationHead: string,
    userId: string
  ): Promise<void | { success: boolean; message: string }>;
}
