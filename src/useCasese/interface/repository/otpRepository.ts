import { IOtp } from "../../../entities/otp";

export interface IOtpRepository {
  createUser(newUser: IOtp): Promise<IOtp & { id: number }>;
  SaveOtp(otp:IOtp):Promise<{success:boolean,message:string}>
  findUser(email: string): Promise<IOtp | null>;
}