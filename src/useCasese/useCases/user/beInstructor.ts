import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../middlewares/errorHandler";
import { IInstructorAgreementRepository } from "../../interface/repository/instructorAgreementRepository";
import { IJsonResponse } from "../../interface/services/jsonResponse";

export const beInstructor = async (
  instructorAgreementRepository: IInstructorAgreementRepository,
  req: Req,
  next: Next
): Promise<IJsonResponse | void> => {
  try {
    return await instructorAgreementRepository.createAgreement({
      userId: req.user?._id as string,
      ...req.body,
    });
  } catch (error: any) {
    return next(new ErrorHandler(500, error.message));
  }
};
