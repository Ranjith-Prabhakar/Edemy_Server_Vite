import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/userRepository";

export const getUsers = async(userRepository:IUserRepository,next:Next)=>{
try {
  return await userRepository.getUsers();
  
} catch (error) {
  
} 
}