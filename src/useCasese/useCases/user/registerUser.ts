import { Response } from "../../interface/services/response";
import { IHashpassword } from "../../interface/services/hashPassword";
import { IOtpRepository } from "../../interface/repository/otpRepository";
import { ISendMail } from "../../interface/services/sendMail";
import { ICreateOtp } from "../../interface/services/createOtp";
import { IJwt } from "../../interface/services/jwt.types";
import { IUserRepository } from "../../interface/repository/userRepository";
import ErrorHandler from "../../middlewares/errorHandler";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import { catchError } from "../../middlewares/catchError";

export const registerUser = async (
  otpRepository: IOtpRepository,
  userRepository: IUserRepository,
  sendMail: ISendMail,
  otpGenerator: ICreateOtp,
  jwtTokenGenerator: IJwt,
  bcrypt: IHashpassword,
  email: string,
  name: string,
  password: string | Promise<string>,
  next: Next
): Promise<string | void> => {
  try {
    // checking whether any user exist in the same email
    const isUserExistOnUserRepo = await userRepository.findUserByEmail(email);
    if (isUserExistOnUserRepo)
      return next(
        new ErrorHandler(400, "user!!! already exist in the same mail id")
      );

    // checking wheter user already present in the otp repo
    let isUserOnOtpRepo = await otpRepository.findUser(email);
    if (isUserOnOtpRepo) {
      await sendMail.sendEmailVerification(
        name,
        email,
        isUserOnOtpRepo.otp as string
      );
      const hashPassword = await bcrypt.createHash(password as string);
      password = hashPassword;
      const jwtToken = await jwtTokenGenerator.createVerificationJWT({
        name,
        email,
        password,
      });
      return jwtToken;
    } else {
      const otp = await otpGenerator.generateOTP();
      await otpRepository.createOtpUserCollection({ email, otp });
      await sendMail.sendEmailVerification(name, email, otp);

      const hashPassword = await bcrypt.createHash(password as string);
      password = hashPassword;
      const jwtToken = await jwtTokenGenerator.createVerificationJWT({
        name,
        email,
        password,
      });
      return jwtToken;
    }
  } catch (error: unknown) {
    catchError(error, next);
  }
};
