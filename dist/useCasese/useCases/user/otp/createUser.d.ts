import { IOtp } from "../../../../entities/otp";
import { IOtpRepository } from "../../../interface/repository/otpRepository";
export declare const createOtpUserCollection: (otpRepository: IOtpRepository, iOtpUser: IOtp) => Promise<void>;
