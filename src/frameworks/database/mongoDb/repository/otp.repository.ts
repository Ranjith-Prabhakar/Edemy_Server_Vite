import otpModel from '../models/otp.model';
import Otp from '../../../../entities/otp';
// import mongoose, { now } from 'mongoose';

class OtpRepository {
  async SaveOtp(otp: Otp) {
    try {
      const { userMail } = otp;

      // Delete old OTP records for the user
      await otpModel.deleteMany({ userMail });

      // Save the new OTP
      const response = await new otpModel(otp).save();

      if(response){
        return {
            success: true,
            message: 'OTP saved',
          };
      }else{
        return {
            success: false,
            message: 'error occured while saving',
          };
      }
     
    } catch (error) {
      console.error('Error saving OTP:', error);
      return {
        success: false,
        message: 'Error saving OTP',
      };
    }
  }

  async findOtpByEmailAndCode(email: string, code: number): Promise<{ success: boolean,message?:string }> {
    let otp = code;
    let userMail =email

    const existingOtp = await otpModel.findOne({ userMail, otp });

    if (existingOtp) {
        let curr = Date.now();

        if (curr > existingOtp.expiresAt.getTime()) {
            return { success: false,message:"expired" };
        }

        await otpModel.deleteOne({userMail})

        return { success: true };
    }

    return { success: false,message:"invalid otp" };
}

  
}

export default OtpRepository;
