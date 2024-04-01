import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../middlewares/errorHandler";
import { IInstructorAgreementRepository } from "../../interface/repository/instructorAgreementRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IInstructorAgreementResponse } from "../../interface/request_And_Response/instructorAgreement";

export const approveOrRejectInstructor = async (
  userRepository: IUserRepository,
  instrctorAgreementRepository: IInstructorAgreementRepository,
  req: Req,
  next: Next
): Promise<IInstructorAgreementResponse> => {
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
       console.log("userData",req.body)
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
    throw next(new ErrorHandler(500, error.message));
  }
};
