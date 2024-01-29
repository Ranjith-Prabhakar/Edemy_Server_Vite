import { IUser } from "../../../entities/user";
import { Req } from "../../../frameworks/types/serverPackageTypes";
import { IJsonResponse } from "./jsonResponse";

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IJwt {
  createVerificationJWT(payLoad: IUser): Promise<string>;
  createAccessAndRefreshToken(id: string): Promise<IToken>;
  verifyJwt(token: string): Promise<
    | IUser
    | {
        userId: string;
        email: string;
        iat: number;
        exp: number;
      }
  >;
  forgotPasswordToken(userId: string, email: string): Promise<string>;
}
