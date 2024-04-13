import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IOtpRepository } from "../../interface/repository/otpRepository";
import { IGeneralResponse } from "../../interface/request_And_Response/generalResponse";
import { IJwt } from "../../interface/services/jwt.types";
export declare const forgotPasswordOtpVerification: (otpRepository: IOtpRepository, jwtToken: IJwt, req: Req, next: Next, token: string) => Promise<IGeneralResponse | void>;
