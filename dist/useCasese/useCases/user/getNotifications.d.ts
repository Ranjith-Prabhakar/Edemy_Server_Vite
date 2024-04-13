import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { INotificationRepository } from "../../interface/repository/notificationRepository";
import { INotificationResponse } from "../../interface/request_And_Response/notification";
export declare const getNotifications: (notificationRepository: INotificationRepository, req: Req, next: Next) => Promise<void | INotificationResponse>;
