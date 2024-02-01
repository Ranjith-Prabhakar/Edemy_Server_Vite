import { IUser } from "../../../entities/user"
import { Next, Req } from "../../../frameworks/types/serverPackageTypes"
import ErrorHandler from "../../middlewares/errorHandler"

export const userSession = async(req:Req,next:Next):Promise<IUser | void>=>{
try {
  return await req.user as IUser
} catch (error:any) {
  return next(new ErrorHandler(500,error.message))
}
}