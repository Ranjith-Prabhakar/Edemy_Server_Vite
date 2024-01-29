import userModel from "../models/userModel";

import { IUserRepository } from "../../../../useCasese/interface/repository/userRepository";
import { IUser } from "../../../../entities/user";

import {
  verifyUser,
  fidUserByEmail,
  findUserForLoin,
  findAndUpdate,
  findByIdAndUpdate,
} from "./user/index";
import { IJsonResponse } from "../../../../useCasese/interface/services/jsonResponse";

export class UserRepository implements IUserRepository {
  constructor(private userModels: typeof userModel) {}
  // **************************************************************************************
  async findUserByEmail(email: string): Promise<IUser | null> {
    const userExist = await fidUserByEmail(email, this.userModels);
    return userExist;
  }
  // **************************************************************************************
  async verifyUser(newUser: IUser): Promise<{
    user?: IUser;
    id?: number;
    success: boolean;
    message: string;
    status: number;
  }> {
    return await verifyUser(newUser, this.userModels);
  }
  // **************************************************************************************

  async findUserForLoin(email: string): Promise<{
    user?: IUser;
    success: boolean;
    message: string;
    status: number;
  }> {
    return await findUserForLoin(email, this.userModels);
  }

  // **************************************************************************************
  async findAndUpdate(data: {
    [key: string]: string | number;
  }): Promise<IJsonResponse> {
    return await findAndUpdate(data, this.userModels);
  }
  ///888888888888888888888888888888888888888888888888888888888888888888888
  // async findByEmailAndUpdate(email: string): Promise<IJsonResponse> {
  //   return await findByEmailAndUpdate(email)
  // }

  async findByIdAndUpdate(
    id: string,
    data: { [key: string]: string | number }
  ): Promise<IJsonResponse> {
    return await findByIdAndUpdate(id, data);
  }
}
