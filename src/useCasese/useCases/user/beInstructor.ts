import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../handler/errorHandler";
import { IInstructorAgreementRepository } from "../../interface/repository/instructorAgreementRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { ICloudSession } from "../../interface/services/cloudSession";

export const beInstructor =async (userRepository:IUserRepository,cloudSession:ICloudSession,instructorAgreementRepository:IInstructorAgreementRepository,req:Req,next:Next) => {
  try {
    return await instructorAgreementRepository.createAgreement(req.body)
  } catch (error:any) {
    return next(new ErrorHandler(500,"internal server error"))    
  }
}