import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IInstructorAgreementRepository } from "../../interface/repository/instructorAgreementRepository";
import { catchError } from "../../middlewares/catchError";

export const instructorRequests = async (
  instructorAgreementRepository: IInstructorAgreementRepository,
  next: Next
): Promise<void | object> => {
  try {
    return await instructorAgreementRepository.getAgreements();
  } catch (error) {
    catchError(error,next)
    // return next(new ErrorHandler(500, error.message));
  }
};
