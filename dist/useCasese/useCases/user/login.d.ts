import { IUserRepository } from "../../interface/repository/userRepository";
import { ICloudSession } from "../../interface/services/cloudSession";
import { IHashpassword } from "../../interface/services/hashPassword";
import { IToken } from "../../interface/services/jwt.types";
import { IUser } from "../../../entities/user";
import { IJwt } from "../../interface/services/jwt.types";
import { Next } from "../../../frameworks/types/serverPackageTypes";
export declare const login: (userRepository: IUserRepository, bcrypt: IHashpassword, token: IJwt, cloudSession: ICloudSession, email: string, password: string, next: Next) => Promise<{
    user: IUser;
    tokens: IToken;
} | void>;
