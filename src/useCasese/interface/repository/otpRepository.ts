import { IOtp } from "../../../entities/otp";

export interface IOtpRepository {
  createOtpUserCollection(newUser: IOtp): Promise<IOtp>;
  // SaveOtp(otp:IOtp):Promise<{success:boolean,message:string}>
  // findUser(email: string): Promise<IOtp | null>;
}