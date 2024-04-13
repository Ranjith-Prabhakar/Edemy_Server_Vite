import { IOtp } from "../../../entities/otp";
export interface IOtpRepository {
    createOtpUserCollection(newUser: IOtp): Promise<IOtp>;
    findUser(email: string): Promise<IOtp | null>;
    findAndDeleteUser(email: string, verificationCode: string): Promise<boolean>;
    findByMailAndDelete(email: string): Promise<boolean | void>;
    findAndVerifyUser(email: string, otp: string): Promise<IOtp | null>;
}
