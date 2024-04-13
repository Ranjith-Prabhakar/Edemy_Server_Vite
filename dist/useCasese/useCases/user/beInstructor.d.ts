import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IInstructorAgreementRepository } from "../../interface/repository/instructorAgreementRepository";
import { IJsonResponse } from "../../interface/services/jsonResponse";
import { IUserRepository } from "../../interface/repository/userRepository";
import { INotificationRepository } from "../../interface/repository/notificationRepository";
export declare const beInstructor: (instructorAgreementRepository: IInstructorAgreementRepository, userRepository: IUserRepository, notificationRepository: INotificationRepository, req: Req, next: Next) => Promise<IJsonResponse | void>;
