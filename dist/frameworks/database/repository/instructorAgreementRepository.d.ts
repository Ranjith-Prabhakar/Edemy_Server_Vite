import { IInstructorAgreement } from "../../../entities/instructorAgreement";
import { IInstructorAgreementRepository } from "../../../useCasese/interface/repository/instructorAgreementRepository";
import { IInstructorAgreementResponse } from "../../../useCasese/interface/request_And_Response/instructorAgreement";
import { IJsonResponse } from "../../../useCasese/interface/services/jsonResponse";
export declare class InstrctorAgreementRepository implements IInstructorAgreementRepository {
    createAgreement(agreement: IInstructorAgreement): Promise<IJsonResponse>;
    getAgreements(): Promise<void | object>;
    updateStatus(userId: string, action: string): Promise<IInstructorAgreementResponse>;
}
