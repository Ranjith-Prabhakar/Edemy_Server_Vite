import otpModel from "../models/otp.model";
import { IOtp } from "../../../../entities/otp";
import { IOtpRepository } from "../../../../useCasese/interface/repository/otpRepository";

export class OtpRepository implements IOtpRepository {
  // **************************************************************************************
  async createOtpUserCollection(newUser: IOtp): Promise<IOtp> {
    try {
      const result = await otpModel.create(newUser);
      return result;
    } catch (error: any) {
      console.log(error.message);
      throw error;
    }
  }
  // **************************************************************************************
  async findUser(email: string): Promise<{ exist: boolean; otp?: string }> {
    const user = await otpModel.findOne({ email });
    if (user) {
      return { exist: true, otp: user.otp };
    } else {
      return { exist: false };
    }
  }

  // **************************************************************************************
  async findAndDeleteUser(
    email: string,
    verificationCode: string
  ): Promise<boolean> {
    try {
      const result = await otpModel.findOneAndDelete({
        email,
        otp: verificationCode,
      });
      if (result) {
        console.log("result from frame->otp rep", result);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  // **************************************************************************************
}
