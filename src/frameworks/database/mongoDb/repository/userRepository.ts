import userModel from "../models/userModel";

import { IUserRepository } from "../../../../useCasese/interface/repository/userRepository";
import { IUser } from "../../../../entities/user";

import {
  createUser,
  fidUserByEmail,
  findAndUpdate,
  findByIdAndUpdate,
} from "./userRepository/user/index";
import { getUsers, getUser, freezUser } from "./userRepository/admin/index";
import { IJsonResponse } from "../../../../useCasese/interface/services/jsonResponse";
import { IUserResponse } from "../../../../useCasese/interface/response/userResponse";

export class UserRepository implements IUserRepository {
  constructor(private userModels: typeof userModel) {}
  // **************************************************************************************
  async findUserByEmail(email: string): Promise<IUser | null> {
    const userExist = await fidUserByEmail(email, this.userModels);
    return userExist;
  }
  // **************************************************************************************
  async createUser(newUser: IUser): Promise<IUser> {
    return await createUser(newUser, this.userModels);
  }

  // **************************************************************************************
  async findAndUpdate(data: {
    [key: string]: string | number;
  }): Promise<IJsonResponse> {
    return await findAndUpdate(data, this.userModels);
  }
  ///888888888888888888888888888888888888888888888888888888888888888888888
  async findByIdAndUpdate(
    id: string,
    data: { [key: string]: string | number }
  ): Promise<IJsonResponse> {
    return await findByIdAndUpdate(id, data);
  }
  ///888888888888888888888888888888888888888888888888888888888888888888888
  async getUsers(): Promise<IUser[]> {
    return await getUsers();
  }
  ///888888888888888888888888888888888888888888888888888888888888888888888
  async getUser(id: string): Promise<IUser> {
    try {
      return await getUser(id);
    } catch (error) {
      throw error;
    }
  }
  ///888888888888888888888888888888888888888888888888888888888888888888888
  async freezUser(id: string): Promise<IUserResponse> {
    try {
      return await freezUser(id);
       
    } catch (error) {
      throw error;
    }
  }
}
