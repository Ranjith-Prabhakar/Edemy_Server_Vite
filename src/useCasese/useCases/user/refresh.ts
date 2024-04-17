import { IUser } from "../../../entities/user";
import { Req, Next } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../middlewares/errorHandler";
import { ICloudSession } from "../../interface/services/cloudSession";
import { IJwt, IToken } from "../../interface/services/jwt.types";
import { catchError } from "../../middlewares/catchError";

export const refresh = async (
  cloudSession: ICloudSession,
  jwtToken: IJwt,
  req: Req,
  next: Next
) => {
  try {
    const token = await jwtToken.createAccessAndRefreshToken(
      req.user?._id as string
    );
    await cloudSession.createUserSession(
      req.user?._id as string,
      req.user as IUser
    );
    return token as IToken;
  } catch (error) {
    catchError(error, next);
  }
};
