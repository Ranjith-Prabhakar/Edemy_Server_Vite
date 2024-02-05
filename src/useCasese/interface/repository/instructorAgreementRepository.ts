import { IInstructorAgreement } from "../../../entities/instructorAgreement";
import { IInstructorAgreementResponse } from "../response/instructorAgreementResponse";
import { IJsonResponse } from "../services/jsonResponse";

export interface IInstructorAgreementRepository {
  createAgreement(agreement: IInstructorAgreement): Promise<IJsonResponse>;
  getAgreements(): Promise<void | object>;
  updateStatus(userId: string, action: string): Promise<IJsonResponse>;
}