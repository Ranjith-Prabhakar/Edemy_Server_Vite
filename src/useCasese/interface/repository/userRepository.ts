import { IUser } from "../../../entities/user";


export interface IUserRepository {
  fidUserByEmail(email: string): Promise<{ userExist: boolean }>;
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
}
