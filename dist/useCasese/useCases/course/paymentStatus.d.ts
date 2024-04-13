import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { IPaymentRepository } from "../../interface/repository/paymentRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IUserResponse } from "../../interface/request_And_Response/user";
import { ICloudSession } from "../../interface/services/cloudSession";
export declare const paymentStatus: (paymentRepository: IPaymentRepository, userRepository: IUserRepository, courseRepository: ICourseRepository, cloudSession: ICloudSession, req: Req, next: Next) => Promise<void | IUserResponse>;
