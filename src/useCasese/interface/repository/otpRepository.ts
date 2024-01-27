import { IOtp } from "../../../entities/otp";

export interface IOtpRepository {
  createOtpUserCollection(newUser: IOtp): Promise<IOtp>;
  findUser(email: string): Promise<{ exist: boolean; otp?: string }>;
  findAndDeleteUser(
    email: string,
    verificationCode:string
  ): Promise<boolean>;
  
}
