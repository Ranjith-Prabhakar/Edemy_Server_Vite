import { IUser } from "../../../entities/user";

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IJwt {
  createVerificationJWT(payLoad: IUser): Promise<string>;
  createAccessAndRefreshToken(id: string): Promise<IToken>;
  // verifyJwt(payLoad:string):Promise<IUser>
}
