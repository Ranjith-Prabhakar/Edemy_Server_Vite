import { Response } from "../../interface/services/response";
import { IHashpassword } from "../../interface/services/hashPassword";
import { IOtpRepository } from "../../interface/repository/otpRepository";
import { ISendMail } from "../../interface/services/sendMail";
import { ICreateOtp } from "../../interface/services/createOtp";
import { IJwt } from "../../interface/services/jwt.types";

export const registerUser = async (
  otpRepository: IOtpRepository,
  sendMail: ISendMail,
  otpGenerator: ICreateOtp,
  jwtTokenGenerator:IJwt,
  bcrypt:IHashpassword,
  email: string,
  name: string,
  password:string  | Promise<string>
): Promise<Response> => {
  try {
    let isUserOnOtpRepo = await otpRepository.findUser(email);
    if (isUserOnOtpRepo.exist) {
      await sendMail.sendEmailVerification(
        name,
        email,
        isUserOnOtpRepo.otp as string
      );
      const hashPassword =await bcrypt.createHash(password as string)
      password = hashPassword 
      const jwtToken = await jwtTokenGenerator.createVerificationJWT({name,email,password})
      return {
        status: 200,
        success: true,
        message: "verification otp has been sent the mail",
        token:jwtToken
      };
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
      return {
        status: 200,
        success: true,
        message: "verification otp has been sent the mail",
        token: jwtToken,
      };
    }
  } catch (err) {
    throw err;
  }
};
