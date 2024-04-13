import { IHashpassword } from "../../interface/services/hashPassword";
import { IOtpRepository } from "../../interface/repository/otpRepository";
import { ISendMail } from "../../interface/services/sendMail";
import { ICreateOtp } from "../../interface/services/createOtp";
import { IJwt } from "../../interface/services/jwt.types";
import { IUserRepository } from "../../interface/repository/userRepository";
import { Next } from "../../../frameworks/types/serverPackageTypes";
export declare const registerUser: (otpRepository: IOtpRepository, userRepository: IUserRepository, sendMail: ISendMail, otpGenerator: ICreateOtp, jwtTokenGenerator: IJwt, bcrypt: IHashpassword, email: string, name: string, password: string | Promise<string>, next: Next) => Promise<string | void>;
