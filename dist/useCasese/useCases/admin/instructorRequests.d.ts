import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IInstructorAgreementRepository } from "../../interface/repository/instructorAgreementRepository";
export declare const instructorRequests: (instructorAgreementRepository: IInstructorAgreementRepository, next: Next) => Promise<void | object>;
