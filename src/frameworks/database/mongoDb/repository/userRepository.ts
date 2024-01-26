import userModel from "../models/userModel";

import { IUserRepository } from "../../../../useCasese/interface/repository/userRepository";
import {IUser} from "../../../../entities/user";

import { 
  createUser,
  fidUserByEmail 
} from "./user/index";

export class UserRepository implements IUserRepository{
  constructor(private  userModels:typeof userModel){}

  async fidUserByEmail(email:string):Promise<{userExist:boolean}> {
    const userExist = await fidUserByEmail(email,this.userModels)
    if(userExist.existingUser){
      return {userExist:true}
    }else{
      return {userExist:false}
    }
  }

   async createUser(newUser: IUser): Promise<{user?:IUser ;id?: number; success: boolean; message: string;status:number }> {
    return createUser(newUser,this.userModels)
  }

 
} 




