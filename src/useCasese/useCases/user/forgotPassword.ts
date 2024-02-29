import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../middlewares/errorHandler";
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
): Promise<string | void> => {
  try {
    const user = await userRepository.findUserByEmail(req.body.email);
    if(!user) next(new ErrorHandler(400,"user not found for this mail id"))
    const isExistInOtpRep = await otpRepository.findUser(req.body.email);
    if (isExistInOtpRep) {
      await sendMail.sendEmailVerification(
        user?.name as string,
        user?.email as string,
        isExistInOtpRep.otp
      );
      const verificationToken = await jwtToken.forgotPasswordToken(
        user?._id as string,
        user?.email as string
      );
      return verificationToken;
    } else {
      const otp = await otpGenerator.generateOTP();
      await sendMail.sendEmailVerification(
        user?.name as string,
        user?.email as string,
        otp
      );
      const verificationToken = await jwtToken.forgotPasswordToken(
        user?._id as string,
        user?.email as string
      );
      await otpRepository.createOtpUserCollection({
        email: user?.email as string,
        otp,
      });
      return verificationToken;
    }
  } catch (error: any) {
    return next(new ErrorHandler(500, error.message));
  }
};
