import { IUser } from "../../../entities/user";
import { IJsonResponse } from "../services/jsonResponse";


export interface IUserRepository {
  findUserByEmail(email: string): Promise<{ userExist: boolean }>;
  verifyUser(newUser: IUser): Promise<{
    id?: number;
    success: boolean;
    message: string;
    status: number;
  }>;
  
  findUserForLoin(email: string): Promise<{
    user?: IUser;
    success: boolean;
    message: string;
    status: number;
  }>;

  findAndUpdate(data:{[key:string]:string | number}):Promise<IJsonResponse>
}
