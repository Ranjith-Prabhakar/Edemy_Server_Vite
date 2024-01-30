import { IUser } from "../../../entities/user";
import { IJsonResponse } from "../services/jsonResponse";


export interface IUserRepository {
  findUserByEmail(email: string): Promise<IUser | null>;
  createUser(newUser: IUser): Promise<IUser>; 
  // 8888888888888888888888888888888888888888888888888888888888888888888888
  findAndUpdate(data: {
    [key: string]: string | number;
  }): Promise<IJsonResponse>;
  // 8888888888888888888888888888888888888888888888888888888888888888888888
  findByIdAndUpdate(
    id: string,
    data: { [key: string]: string | number }
  ): Promise<IJsonResponse>;
  // 8888888888888888888888888888888888888888888888888888888888888888888888
  getUsers(): Promise<IUser[]>;
  // 8888888888888888888888888888888888888888888888888888888888888888888888
  getUser(id: string): Promise<IUser>;
  // 8888888888888888888888888888888888888888888888888888888888888888888888
  freezUser(id:string):Promise<boolean>
}
