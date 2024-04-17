import { IUser } from "../../../entities/user"
import { Next, Req } from "../../../frameworks/types/serverPackageTypes"
import { catchError } from "../../middlewares/catchError"

export const userSession = async(req:Req,next:Next):Promise<IUser | void>=>{
try {
  return await req.user as IUser
} catch (error) {
catchError(error,next)
}
}