import { Response } from "express";
import { IOtpRepository } from "../../interface/repository/otpRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IJwt } from "../../interface/services/jwt.types";
export const verifyUser = async (
  userRepository: IUserRepository,
  otpRepository: IOtpRepository,
  jwtVerifier: IJwt,
  verificationCode: string,
  token: string
) => {
  //Promise<Response>
  try {
    let decode = await jwtVerifier.verifyJwt(token);
    if (decode) {
      const result = await otpRepository.findAndDeleteUser(
        decode.email,
        verificationCode
      );
      if (result) {
        decode.isVerified = true;
        const newUser = await userRepository.verifyUser(decode);
        return newUser
      } else {
        return { success: false, message: "verification code mismatch" ,status:400};
      }
    } else {
      return { success: false, message: "token expired", status: 400 };
    }
  } catch (error) {
    throw error;
  }
};
