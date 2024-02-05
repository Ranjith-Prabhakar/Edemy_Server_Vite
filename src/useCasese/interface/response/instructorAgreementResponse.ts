import { IInstructorAgreement } from "../../../entities/instructorAgreement";

export interface IInstructorAgreementResponse {
  success: boolean;
  message: string;
  data?: IInstructorAgreement | IInstructorAgreement[] | null;
}
