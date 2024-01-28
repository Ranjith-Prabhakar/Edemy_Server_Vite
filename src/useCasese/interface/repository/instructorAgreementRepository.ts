import { IInstructorAgreement } from "../../../entities/instructorAgreement";
import { IJsonResponse } from "../services/jsonResponse";

export interface IInstructorAgreementRepository {
  createAgreement(agreement: IInstructorAgreement): Promise<IJsonResponse>;
  updateStatus(userId:string,action:string):Promise<IJsonResponse>
}