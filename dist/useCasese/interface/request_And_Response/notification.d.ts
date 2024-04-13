import { INotification } from "../../../entities/notification";
export interface INotificationResponse {
    success: boolean;
    message: string;
    data?: INotification;
}
