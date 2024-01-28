import { IUser } from "../../../entities/user"

export interface IJsonResponse{
  user?:IUser
  status:number,
  success:boolean,
  message:string
}