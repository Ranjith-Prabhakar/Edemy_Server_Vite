import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IUser } from "../../../entities/user";
export declare const getUser: (userRepository: IUserRepository, req: Req, next: Next) => Promise<IUser | void>;
