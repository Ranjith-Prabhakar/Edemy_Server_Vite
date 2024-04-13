import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IOtpRepository } from "../../interface/repository/otpRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IGeneralResponse } from "../../interface/request_And_Response/generalResponse";
import { IHashpassword } from "../../interface/services/hashPassword";
import { IJwt } from "../../interface/services/jwt.types";
export declare const resetForgotPassword: (userRepository: IUserRepository, otpRepository: IOtpRepository, jwtVerifier: IJwt, bcrypt: IHashpassword, req: Req, token: string, next: Next) => Promise<IGeneralResponse | void>;
