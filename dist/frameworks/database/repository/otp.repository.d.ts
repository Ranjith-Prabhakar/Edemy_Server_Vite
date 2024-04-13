import { IOtp } from "../../../entities/otp";
import { IOtpRepository } from "../../../useCasese/interface/repository/otpRepository";
export declare class OtpRepository implements IOtpRepository {
    createOtpUserCollection(newUser: IOtp): Promise<IOtp>;
    findUser(email: string): Promise<IOtp | null>;
    findAndDeleteUser(email: string, verificationCode: string): Promise<boolean>;
    findByMailAndDelete(email: string): Promise<void | boolean>;
    findAndVerifyUser(email: string, otp: string): Promise<IOtp | null>;
}
