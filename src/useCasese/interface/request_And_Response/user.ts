import { IUser } from "../../../entities/user"; 

export interface IUserResponse {
  success:boolean;
  message: string;
  data?: IUser | IUser[] | null;
}
