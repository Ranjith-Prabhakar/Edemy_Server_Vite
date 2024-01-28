import { IInstructorAgreement } from "../../../entities/instructorAgreement";

export interface IInstructorAgreementRepository{
  createAgreement(agreement:IInstructorAgreement):Promise<boolean>
}