import { IUserRepository } from "../../interface/repository/userRepository";
import { ICloudSession } from "../../interface/services/cloudSession";
import { IHashpassword } from "../../interface/services/hashPassword";
import {IJwt} from "../../interface/services/jwt.types"

export const login = async (
  userRepository: IUserRepository,
  bcrypt: IHashpassword,
  token: IJwt,
  cloudSession: ICloudSession,
  email: string,
  password: string
) => {
  const userValidation = await userRepository.findUserForLoin(email);
  if (userValidation.user) {
    const hashPassword = userValidation.user.password;
    const result = await bcrypt.comparePassword(password, hashPassword);
    if (result) {
      let user = userValidation?.user;
      user.password = "";
      const tokens = await token.createAccessAndRefreshToken(
        user?._id as string
      );
       await cloudSession.createUserSession(user?._id as string,user);

      return {
        user,
        tokens,
        status: 200,
        success: true,
        message: "user logged in success fully",
      };
    } else {
      return { status: 400, success: false, message: "invalid password id" };
    }
  } else {
    return { status: 400, success: false, message: "invalid email id" };
  }
};
