import otpModel from "../models/otp.model";
import { IOtp } from "../../../entities/otp";
import { IOtpRepository } from "../../../useCasese/interface/repository/otpRepository";

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
  async findUser(email: string): Promise<IOtp | null> {
    try {
      return await otpModel.findOne({ email });
    } catch (error) {
      throw error;
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
  async findByMailAndDelete(email: string): Promise<void | boolean> {
    try {
      const result = await otpModel.deleteOne({ email: email });
      if (!result) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      throw error;
    }
  }
  // **************************************************************************************
  async findAndVerifyUser(email: string, otp: string): Promise<IOtp | null> {
    try {
      return await otpModel.findOne({ email, otp });
    } catch (error) {
      throw error;
    }
  }
}
