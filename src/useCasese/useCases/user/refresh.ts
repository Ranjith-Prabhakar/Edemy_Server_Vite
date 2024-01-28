import { IUser } from "../../../entities/user";
import { Req, Next } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../handler/errorHandler";
import { ICloudSession } from "../../interface/services/cloudSession";
import { IJwt, IToken } from "../../interface/services/jwt.types";

export const refresh = async (
  cloudSession: ICloudSession,
  jwtToken: IJwt,
  req: Req,
  next: Next
) => {
  try {
    // const refreshToken = await jwtToken.hasRefreshToken(req);
    // if (refreshToken.success === true) {
    //   const getSession = await cloudSession.getUser(
    //     refreshToken.user?.id as string
    //   );
        // console.log("inside refresh->uucse", getSession);
    
      // if (typeof getSession === "string") {
        // const user: IUser = JSON.parse(getSession);
        const token = await jwtToken.createAccessAndRefreshToken(
          req.user?._id as string
        );
        await cloudSession.createUserSession(
          req.user?._id as string,
          req.user as IUser
        );
          return token as IToken
      // } else {
      //   return getSession;
      // }
    // } else {
    //   return refreshToken;
    // }
  } catch (error: any) {
    return next(new ErrorHandler(500, "internal server error"));
  }
};
