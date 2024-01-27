import { IUser } from "../../../entities/user";
export interface IJwt {
  createVerificationJWT(payLoad:IUser): Promise<string>;
  verifyJwt(payLoad:string):Promise<IUser>
}
