import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../middlewares/errorHandler";
import { IInstructorAgreementRepository } from "../../interface/repository/instructorAgreementRepository";
import { IJsonResponse } from "../../interface/services/jsonResponse";
import { SocketClass } from "../../staticClassProperty/StaticClassProperty";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IInstructorAgreement } from "../../../entities/instructorAgreement";
import { ENotification } from "../../../entities/notification";
import { INotificationRepository } from "../../interface/repository/notificationRepository";

export const beInstructor = async (
  instructorAgreementRepository: IInstructorAgreementRepository,
  userRepository: IUserRepository,
  notificationRepository: INotificationRepository,
  req: Req,
  next: Next
): Promise<IJsonResponse | void> => {
  try {
    const result = await instructorAgreementRepository.createAgreement({
      userId: req.user?._id as string,
      userName: req.user?.name as string,
      ...req.body,
    });
    console.log("result instructorAgreementRepository", result);
    if (result.agreement) {
      const admin = await userRepository.getAdmin();

      const notificationRepoResult =
        await notificationRepository.addNotification(
          admin?._id as string,
          ENotification.instructorRequests
        );
      console.log("notificationRepoResult", notificationRepoResult);
      if (notificationRepoResult) {
        if (admin) {
          const adminSocket = SocketClass.SocketUsers[admin._id as string];
          adminSocket.emit(
            "fromServerInstructorRequestSubmitted",
            result.agreement as IInstructorAgreement
          );
        }
      }
    }
    return result;
  } catch (error: any) {
    return next(new ErrorHandler(500, error.message));
  }
};
