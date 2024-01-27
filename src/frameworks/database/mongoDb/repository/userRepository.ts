import userModel from "../models/userModel";

import { IUserRepository } from "../../../../useCasese/interface/repository/userRepository";
import { IUser } from "../../../../entities/user";

import { verifyUser, fidUserByEmail, findUserForLoin } from "./user/index";

export class UserRepository implements IUserRepository {
  constructor(private userModels: typeof userModel) {}

  async fidUserByEmail(email: string): Promise<{ userExist: boolean }> {
    const userExist = await fidUserByEmail(email, this.userModels);
    return userExist;
  }

  async verifyUser(newUser: IUser): Promise<{
    user?: IUser;
    id?: number;
    success: boolean;
    message: string;
    status: number;
  }> {
    return await verifyUser(newUser, this.userModels);
  }

  async findUserForLoin(email: string): Promise<{
    user?: IUser;
    success: boolean;
    message: string;
    status: number;
  }> {
    return await findUserForLoin(email, this.userModels);
    
  }
}
