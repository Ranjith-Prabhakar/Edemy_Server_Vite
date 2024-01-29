import { Req } from "../../../frameworks/types/serverPackageTypes";
import { IOtpRepository } from "../../interface/repository/otpRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IJwt } from "../../interface/services/jwt.types";

export const resetForgotPassword = async (
  userRepository: IUserRepository,
  otpRepository: IOtpRepository,
  jwtVerifier: IJwt,
  req: Req,
  token: string
) => {
  try {
    let decode = (await jwtVerifier.verifyJwt(token)) as {
      userId: string;
      email: string;
      iat: number;
      exp: number;
    };
    if (decode) {
      console.log("resetforgotpassword --0", decode);
      const result = await otpRepository.findAndDeleteUser(
        decode.email as string,
        req.body.verificationCode
      );
      console.log("resetforgotpassword --1", result);
    }
    const user = await userRepository.findByIdAndUpdate(
      decode.userId as string,
      { password: req.body.password as string }
    );
      if(user){
        return{
          status:200,
          success:true,
          message:"user password has been updated"
        }
      }
  } catch (error) {
    throw error;
  }
};
