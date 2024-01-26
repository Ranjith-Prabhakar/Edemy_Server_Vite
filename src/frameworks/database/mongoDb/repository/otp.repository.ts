import otpModel from '../models/otp.model';
import { IOtp } from '../../../../entities/otp';
import { IOtpRepository } from '../../../../useCasese/interface/repository/otpRepository';


export class OtpRepository implements IOtpRepository{
  
  async createOtpUserCollection (newUser:IOtp):Promise<IOtp >{
try {
  const result = await otpModel.create(newUser)
    return result
} catch (error:any) {
  console.log(error.message)
  throw error
}
    
  }
//   async SaveOtp(otp: IOtp) {
//     try {
//       const { userMail } = otp;

//       // Delete old OTP records for the user
//       await otpModel.deleteMany({ userMail });

//       // Save the new OTP
//       const response = await new otpModel(otp).save();

//       if(response){
//         return {
//             success: true,
//             message: 'OTP saved',
//           };
//       }else{
//         return {
//             success: false,
//             message: 'error occured while saving',
//           };
//       }
     
//     } catch (error) {
//       console.error('Error saving OTP:', error);
//       return {
//         success: false,
//         message: 'Error saving OTP',
//       };
//     }
//   }

//   async findOtpByEmailAndCode(email: string, code: number): Promise<{ success: boolean,message?:string }> {
//     let otp = code;
//     let userMail =email

//     const existingOtp = await otpModel.findOne({ userMail, otp });

//     if (existingOtp) {
//         let curr = Date.now();

//         if (curr > existingOtp.expiresAt.getTime()) {
//             return { success: false,message:"expired" };
//         }

//         await otpModel.deleteOne({userMail})

//         return { success: true };
//     }

//     return { success: false,message:"invalid otp" };
// }

  
}

