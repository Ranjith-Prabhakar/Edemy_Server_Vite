import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { INotificationRepository } from "../../interface/repository/notificationRepository";
import { INotificationResponse } from "../../interface/request_And_Response/notification";
import { catchError } from "../../middlewares/catchError";

export const getNotifications = async (
  notificationRepository: INotificationRepository,
  req: Req,
  next: Next
): Promise<void | INotificationResponse> => {
  try {
    return await notificationRepository.getNotifications(req.user?._id as string);
  } catch (error) {
    catchError(error, next);
  }
};
