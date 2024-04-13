import { ICourse } from "../../../entities/course";
import { INotificationRepository } from "../../../useCasese/interface/repository/notificationRepository";
import { INotificationResponse } from "../../../useCasese/interface/request_And_Response/notification";
export declare class NotificationRepository implements INotificationRepository {
    addNotification(userId: string, key: string, value?: ICourse): Promise<boolean | void>;
    getNotifications(userId: string): Promise<void | INotificationResponse>;
    updateNotifications(notificationHead: string, userId: string): Promise<void | {
        success: boolean;
        message: string;
    }>;
}
