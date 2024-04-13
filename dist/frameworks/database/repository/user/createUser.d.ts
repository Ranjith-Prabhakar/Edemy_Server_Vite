import { IUser } from "../../../../entities/user";
import userModel from "../../models/userModel";
export declare const createUser: (newUser: IUser, userModels: typeof userModel) => Promise<IUser>;
