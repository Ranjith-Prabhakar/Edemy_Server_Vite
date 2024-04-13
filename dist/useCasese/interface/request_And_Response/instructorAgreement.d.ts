import { IInstructorAgreement } from "../../../entities/instructorAgreement";
export interface IInstructorAgreementResponse {
    status?: number;
    success: boolean;
    message: string;
    data?: IInstructorAgreement | IInstructorAgreement[] | null;
}
