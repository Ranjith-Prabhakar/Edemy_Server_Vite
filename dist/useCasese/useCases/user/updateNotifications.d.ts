import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { INotificationRepository } from "../../interface/repository/notificationRepository";
export declare const updateNotifications: (notificationRepository: INotificationRepository, req: Req, next: Next) => Promise<void | {
    success: boolean;
    message: string;
}>;
