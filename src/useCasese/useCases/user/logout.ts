import { CloudSession } from "../../../frameworks/services/cloudSession";
import { Req, Res, Next } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../middlewares/errorHandler";
import { IRequestManagement } from "../../interface/services/requestManagement";

export const logout = async (
  cloudSession: CloudSession,
  requestManagement: IRequestManagement,
  req: Req,
  res: Res,
  next: Next
):Promise<void> => {
  try {
    await requestManagement.logoutCleanUp(res);
    const clearUserSession = await cloudSession.clearUserSession(
      req.user?._id as string
    );
    if (clearUserSession !== 1) return next(new ErrorHandler(500, "something went wrong"));
    
  } catch (error:any) {
    return next(new ErrorHandler(500,error.message));
  }
};
