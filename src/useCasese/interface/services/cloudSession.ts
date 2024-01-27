import { IUser } from "../../../entities/user";

export interface ICloudSession{
  createUserSession(id:string,user:IUser):Promise<string>
  clearUserSession(id:string):Promise<number>
}