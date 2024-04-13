import { IOtpRepository } from "../../interface/repository/otpRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IJwt } from "../../interface/services/jwt.types";
import { IUser } from "../../../entities/user";
import { Next } from "../../../frameworks/types/serverPackageTypes";
export declare const createUser: (userRepository: IUserRepository, otpRepository: IOtpRepository, jwtVerifier: IJwt, verificationCode: string, token: string, next: Next) => Promise<void | IUser>;
