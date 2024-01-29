import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../handler/errorHandler";
import { IOtpRepository } from "../../interface/repository/otpRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { ICreateOtp } from "../../interface/services/createOtp";
import { IJwt } from "../../interface/services/jwt.types";
import { ISendMail } from "../../interface/services/sendMail";

export const forgotPassword = async (
  otpRepository: IOtpRepository,
  userRepository: IUserRepository,
  sendMail: ISendMail,
  otpGenerator: ICreateOtp,
  jwtToken: IJwt,
  req: Req,
  next: Next
) => {
 try {
  

   const user = await userRepository.findUserByEmail(req.body.email);
   console.log("forgot pasword --1",user)
   const otp = await otpGenerator.generateOTP();
   console.log("forgot pasword --2", otp);

   await sendMail.sendEmailVerification(
     user?.name as string,
     user?.email as string,
     otp
   );
   console.log("forgot pasword --3");

   const verificationToken = await jwtToken.forgotPasswordToken(
     user?._id as string,
     user?.email as string
   );
   console.log("forgot pasword --4", verificationToken);

   await otpRepository.createOtpUserCollection({ email: user?.email as string, otp });
   console.log("forgot pasword --5", otpRepository);
   
   return {
     token: verificationToken,
     status: 200,
     succuss: true,
     message: "verification code has been sent to your account",
   };
 } catch (error:any) {
  return next(new ErrorHandler(500,error.message))
 }
};
