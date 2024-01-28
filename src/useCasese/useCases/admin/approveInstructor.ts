import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IJsonResponse } from "../../interface/services/jsonResponse";

export const approveInstructor = async(userRepository:IUserRepository,req:Req,next:Next):Promise<IJsonResponse>=>{
  return await userRepository.findAndUpdate(req.body)
}