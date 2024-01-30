import otpModel from "../models/otp.model";
import { IOtp } from "../../../../entities/otp";
import { IOtpRepository } from "../../../../useCasese/interface/repository/otpRepository";
import { error } from "console";

export class OtpRepository implements IOtpRepository {
  // **************************************************************************************
  async createOtpUserCollection(newUser: IOtp): Promise<IOtp> {
    try {
      const result = await otpModel.create(newUser);
      return result;
    } catch (error: any) {
      throw error;
    }
  }
  // **************************************************************************************
  async findUser(email: string): Promise<null> {
    try {
      return await otpModel.findOne({ email });
    } catch (error) {
      throw error
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
