import { IOtp } from "../../../entities/otp";

export interface IOtpRepository {
  createOtpUserCollection(newUser: IOtp): Promise<IOtp>;
  findUser(email: string): Promise<IOtp | null>;
  findAndDeleteUser(
    email: string,
    verificationCode:string
  ): Promise<boolean>;
  
}
