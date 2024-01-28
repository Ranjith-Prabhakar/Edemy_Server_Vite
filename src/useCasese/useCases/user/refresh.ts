import { IUser } from "../../../entities/user";
import { Req, Next } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../handler/errorHandler";
import { ICloudSession } from "../../interface/services/cloudSession";
import { IJwt } from "../../interface/services/jwt.types";

export const refresh = async (
  cloudSession: ICloudSession,
  jwtToken: IJwt,
  req: Req,
  next: Next
) => {
  try {
    const refreshToken = await jwtToken.hasRefreshToken(req);
    if (refreshToken.success === true) {
      const getSession = await cloudSession.getUser(
        refreshToken.user?.id as string
      );
        console.log("inside refresh->uucse", getSession);
    
      if (typeof getSession === "string") {
        const user: IUser = JSON.parse(getSession);
        const token = await jwtToken.createAccessAndRefreshToken(
          user._id as string
        );
        const session = await cloudSession.createUserSession(
          user._id as string,
          user
        );
        console.log("session in refresh->userusecase token", session, token);
      } else {
        return getSession;
      }
    } else {
      return refreshToken;
    }
  } catch (error: any) {
    return next(new ErrorHandler(500, "internal server error"));
  }
};
