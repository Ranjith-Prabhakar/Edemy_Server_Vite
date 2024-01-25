import userModel from "../models/userModel";

import { IUserRepository } from "../../../../useCasese/interface/repository/userRepository";
import {IUser} from "../../../../entities/user";

import { createUser } from "./user/index";

export class UserRepository implements IUserRepository{
  constructor(private  userModels:typeof userModel){}
  
   async createUser(newUser: IUser): Promise<{user?:IUser ;id?: number; success: boolean; message: string; }> {
    console.log("inside user repository")
    return createUser(newUser,this.userModels)
  }

 
} 




