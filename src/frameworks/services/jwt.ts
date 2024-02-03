import {IUser} from '../../entities/user';
import { IJwt, IToken } from "../../useCasese/interface/services/jwt.types"; 
import jwt from 'jsonwebtoken'
require('dotenv').config();

  
export class JWTtoken implements IJwt {
  // ***************************************************************************************
  JWT_VERIFICATION_KEY = process.env.JWT_VERIFICATION_KEY || "";
  JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY || "";
  JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || "";

  async createVerificationJWT(payLoad: IUser): Promise<string> {
    const verifyToken = await jwt.sign(payLoad, this.JWT_VERIFICATION_KEY, {
      expiresIn: "15m",
    });
    return verifyToken;
  }
  // ***************************************************************************************
  async createAccessAndRefreshToken(_id: string): Promise<IToken> {
    const accessToken = await jwt.sign({ id: _id }, this.JWT_ACCESS_KEY, {
      expiresIn: "5h",
    });
    const refreshToken = await jwt.sign({ id: _id }, this.JWT_REFRESH_KEY, {
      expiresIn: "3d",
    });

    return { accessToken, refreshToken };
  }
  // ***************************************************************************************
  async verifyJwt(token: string): Promise<IUser> {
    return (await jwt.verify(token, this.JWT_VERIFICATION_KEY)) as IUser;
  }
  // ***************************************************************************************

  async forgotPasswordToken(userId:string,email:string): Promise<string> {
    const token = await jwt.sign({ userId:userId,email:email }, this.JWT_VERIFICATION_KEY, {
      expiresIn: "10m",
    });
    return token;
  }
}

