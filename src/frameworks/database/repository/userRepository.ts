import userModel from "../models/userModel";

import { IUserRepository } from "../../../useCasese/interface/repository/userRepository";
import { IUser } from "../../../entities/user";

import {
  createUser,
  fidUserByEmail,
  findAndUpdate,
  findByIdAndUpdate,
  addEnrolledCourse,
  updateCourses,
  getAdmin,
} from "./user/index";
import { getUsers, getUser, freezUser, unFreezUser } from "./admin/index";
import { IJsonResponse } from "../../../useCasese/interface/services/jsonResponse";
import { IUserResponse } from "../../../useCasese/interface/request_And_Response/user";

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
  async getUsers(role: string): Promise<IUser[]> {
    return await getUsers(role);
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
  ///888888888888888888888888888888888888888888888888888888888888888888888
  async unFreezUser(id: string): Promise<IUserResponse> {
    try {
      return await unFreezUser(id);
    } catch (error) {
      throw error;
    }
  }
  ///888888888888888888888888888888888888888888888888888888888888888888888
  async addEnrolledCourse(
    courseId: string,
    userId: string
  ): Promise<IUser | void> {
    try {
      return await addEnrolledCourse(courseId, userId);
    } catch (error) {
      throw error;
    }
  }
  ///888888888888888888888888888888888888888888888888888888888888888888888
  async updateCourses(courseId: string, userId: string): Promise<IUser | void> {
    try {
      return await updateCourses(courseId, userId);
    } catch (error) {
      throw error;
    }
  }
  ///888888888888888888888888888888888888888888888888888888888888888888888
  async getAdmin(): Promise<void | IUser> {
    try {
      return await getAdmin()
    } catch (error) {
      throw error
    }
  }
}
