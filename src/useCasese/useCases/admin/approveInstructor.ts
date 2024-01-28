import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../handler/errorHandler";
import { IInstructorAgreementRepository } from "../../interface/repository/instructorAgreementRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IJsonResponse } from "../../interface/services/jsonResponse";

export const approveInstructor = async (
  userRepository: IUserRepository,
  instrctorAgreementRepository: IInstructorAgreementRepository,
  req: Req,
  next: Next
): Promise<IJsonResponse> => {
  try {
    if (req.body.action === "approved") {
      const instructorAgreement =
        await instrctorAgreementRepository.updateStatus(
          req.body.agreementId,
          "approved"
        );
      if (instructorAgreement.status === (500 | 404)) {
        return instructorAgreement;
      } else {
        return await userRepository.findAndUpdate(req.body);
      }
    } else {
      const instructorAgreement =
        await instrctorAgreementRepository.updateStatus(
          req.body.userId,
          "rejected"
        );
        return instructorAgreement;
    }
  } catch (error: any) {
    throw next(new ErrorHandler(500, error.message));
  }
};
