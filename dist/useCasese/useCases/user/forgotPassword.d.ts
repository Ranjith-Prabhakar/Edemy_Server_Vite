import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IOtpRepository } from "../../interface/repository/otpRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { ICreateOtp } from "../../interface/services/createOtp";
import { IJwt } from "../../interface/services/jwt.types";
import { ISendMail } from "../../interface/services/sendMail";
export declare const forgotPassword: (otpRepository: IOtpRepository, userRepository: IUserRepository, sendMail: ISendMail, otpGenerator: ICreateOtp, jwtToken: IJwt, req: Req, next: Next) => Promise<string | void>;
