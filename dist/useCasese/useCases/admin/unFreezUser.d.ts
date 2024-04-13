import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IUserResponse } from "../../interface/request_And_Response/user";
export declare const unFreezUser: (userRepository: IUserRepository, req: Req, next: Next) => Promise<IUserResponse | void>;
