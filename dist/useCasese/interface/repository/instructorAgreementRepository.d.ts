import { IInstructorAgreement } from "../../../entities/instructorAgreement";
import { IInstructorAgreementResponse } from "../request_And_Response/instructorAgreement";
import { IJsonResponse } from "../services/jsonResponse";
export interface IInstructorAgreementRepository {
    createAgreement(agreement: IInstructorAgreement): Promise<IJsonResponse>;
    getAgreements(): Promise<void | object>;
    updateStatus(userId: string, action: string): Promise<IInstructorAgreementResponse>;
}
