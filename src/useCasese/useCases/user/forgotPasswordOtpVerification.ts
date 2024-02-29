import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IOtpRepository } from "../../interface/repository/otpRepository";
import { IGeneralResponse } from "../../interface/request_And_Response/generalResponse";
import { IJwt } from "../../interface/services/jwt.types";
import ErrorHandler from "../../middlewares/errorHandler";

export const forgotPasswordOtpVerification = async (
  otpRepository: IOtpRepository,
  jwtToken: IJwt,
  req: Req,
  next: Next,
  token: string
): Promise<IGeneralResponse | void> => {
  try {
    const decode = await jwtToken.verifyJwt(token);
    console.log("forgotPasswordOtpVerification decode", decode);
    if (!decode)
      return next(
        new ErrorHandler(400, "you didn`t made any request for change password")
      );
    // const isExist = await otpRepository.findUser(decode?.email );
    const isExist = await otpRepository.findAndVerifyUser(
      decode?.email,
      req.body.verificationCode
    );
    if (!isExist) return next(new ErrorHandler(400, "entered a wrong OTP..."));
    return { success: true, message: "otp matches " };
  } catch (error: any) {
    return next(new ErrorHandler(500, error.message));
  }
};
