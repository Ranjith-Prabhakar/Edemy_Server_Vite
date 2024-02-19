import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IOtpRepository } from "../../interface/repository/otpRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IGeneralResponse } from "../../interface/request_And_Response/generalResponse";
import { IHashpassword } from "../../interface/services/hashPassword";
import { IJwt } from "../../interface/services/jwt.types";
import ErrorHandler from "../../middlewares/errorHandler";

export const resetForgotPassword = async (
  userRepository: IUserRepository,
  otpRepository: IOtpRepository,
  jwtVerifier: IJwt,
  bcrypt: IHashpassword,
  req: Req,
  token: string,
  next: Next
): Promise<IGeneralResponse | void> => {
  try {
    let decode = (await jwtVerifier.verifyJwt(token)) as {
      userId: string;
      email: string;
      iat: number;
      exp: number;
    };
    console.log("resetForgotPassword decode", decode);
    let otpRepAction = await otpRepository.findByMailAndDelete(
      decode.email as string
    );
    if (!otpRepAction)
      return next(
        new ErrorHandler(
          400,
          "you didn`t make any request to change the password"
        )
      );

    let password = await bcrypt.createHash(req.body.password);
    const user = await userRepository.findByIdAndUpdate(
      decode.userId as string,
      { password: password as string }
    );
    if (user) {
      return {
        success: true,
        message: "user password has been updated",
      };
    }
  } catch (error) {
    throw error;
  }
};
