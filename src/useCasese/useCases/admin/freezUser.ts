import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/userRepository";

export const freezUser = async(userRepository:IUserRepository,req:Req,next:Next)=>{
  return await userRepository.freezUser(req.params.id as string)  
}