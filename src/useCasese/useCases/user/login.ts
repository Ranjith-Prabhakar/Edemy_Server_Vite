import { IUserRepository } from "../../interface/repository/userRepository";
import { ICloudSession } from "../../interface/services/cloudSession";
import { IHashpassword } from "../../interface/services/hashPassword";
import { IToken } from "../../interface/services/jwt.types";
import { IUser } from "../../../entities/user";
import { IJwt } from "../../interface/services/jwt.types";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../middlewares/errorHandler";

export const login = async (
  userRepository: IUserRepository,
  bcrypt: IHashpassword,
  token: IJwt,
  cloudSession: ICloudSession,
  email: string,
  password: string,
  next: Next
): Promise<{ user: IUser; tokens: IToken } | void> => {
  try {
    const user = await userRepository.findUserByEmail(email);

    if (!user) return next(new ErrorHandler(400, "invalid email id"));
    if (user.status === "frozen")
      next(new ErrorHandler(400, "access has been denied by admin"));
    const hashPassword = user.password;

    const result = await bcrypt.comparePassword(password, hashPassword);
    if (!result) next(new ErrorHandler(400, "invalid password id"));

    user.password = "";
    const tokens = await token.createAccessAndRefreshToken(user?._id as string);
    await cloudSession.createUserSession(user?._id as string, user);
    return {
      user,
      tokens,
    };
  } catch (error) {
    throw error;
  }
};
