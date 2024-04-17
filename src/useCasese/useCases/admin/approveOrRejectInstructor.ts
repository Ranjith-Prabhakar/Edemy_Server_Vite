import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IInstructorAgreementRepository } from "../../interface/repository/instructorAgreementRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IInstructorAgreementResponse } from "../../interface/request_And_Response/instructorAgreement";
import { catchError } from "../../middlewares/catchError";

export const approveOrRejectInstructor = async (
  userRepository: IUserRepository,
  instrctorAgreementRepository: IInstructorAgreementRepository,
  req: Req,
  next: Next
): Promise<IInstructorAgreementResponse | void> => {
  try {
    if (req.body.action === "approved") {
      const result = await instrctorAgreementRepository.updateStatus(
        req.body.agreementId,
        "approved"
      );
      if (result.status === (500 | 404)) {
        return result;
      } else {
       await userRepository.findAndUpdate(req.body);
        return result;
      }
    } else {
      const result = await instrctorAgreementRepository.updateStatus(
        req.body.userId,
        "rejected"
      );
      return result;
    }
  } catch (error: any) {
    catchError(error,next)
    // throw next(new ErrorHandler(500, error.message));
  }
};
