import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/userRepository";
export declare const getUsers: (userRepository: IUserRepository, next: Next) => Promise<void | import("../../../entities/user").IUser[]>;
