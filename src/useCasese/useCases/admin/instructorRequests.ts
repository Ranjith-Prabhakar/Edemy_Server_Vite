import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IInstructorAgreementRepository } from "../../interface/repository/instructorAgreementRepository";
import { IInstructorAgreementResponse } from "../../interface/request_And_Response/instructorAgreement";
import ErrorHandler from "../../middlewares/errorHandler";

export const instructorRequests = async (
  instructorAgreementRepository: IInstructorAgreementRepository,
  next: Next
): Promise<void | object> => {
  try {
    return await instructorAgreementRepository.getAgreements();
  } catch (error: any) {
    return next(new ErrorHandler(500, error.message));
  }
};
