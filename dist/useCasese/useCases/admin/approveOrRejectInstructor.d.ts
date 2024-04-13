import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IInstructorAgreementRepository } from "../../interface/repository/instructorAgreementRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IInstructorAgreementResponse } from "../../interface/request_And_Response/instructorAgreement";
export declare const approveOrRejectInstructor: (userRepository: IUserRepository, instrctorAgreementRepository: IInstructorAgreementRepository, req: Req, next: Next) => Promise<IInstructorAgreementResponse>;
