import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { INotificationRepository } from "../../interface/repository/notificationRepository";
import { catchError } from "../../middlewares/catchError";

export const updateNotifications = async (
  notificationRepository: INotificationRepository,
  req: Req,
  next: Next
): Promise<void | { success: boolean; message: string }> => {
  try {
    return await notificationRepository.updateNotifications(
      req.body.notificationHead as string,
      req.user?._id as string
    );
  } catch (error) {
    catchError(error, next);
  }
};
