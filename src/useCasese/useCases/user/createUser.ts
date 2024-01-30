import { IOtpRepository } from "../../interface/repository/otpRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IJwt } from "../../interface/services/jwt.types";
import { IUser } from "../../../entities/user";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../middlewares/errorHandler";

export const createUser = async (
  userRepository: IUserRepository,
  otpRepository: IOtpRepository,
  jwtVerifier: IJwt,
  verificationCode: string,
  token: string,
  next: Next
) => {
  try {
    let decode = (await jwtVerifier.verifyJwt(token)) as IUser;
    if (!decode)
      return next(
        new ErrorHandler(400, "token has been expired ,register again")
      );

    const result = await otpRepository.findAndDeleteUser(
      decode.email,
      verificationCode
    );

    if (!result)
      return next(new ErrorHandler(400, "verification code mismatch"));

    decode.isVerified = true;
    const newUser = await userRepository.createUser(decode);
    newUser.password = "";
    return newUser;
  } catch (error) {
    throw error;
  }
};
