import {IUser} from '../../entities/user';
import { IJsonResponse } from '../../useCasese/interface/services/jsonResponse';
import { IJwt, IToken } from "../../useCasese/interface/services/jwt.types"; 
import jwt from 'jsonwebtoken'
import { Req } from '../types/serverPackageTypes';
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
  // async hasRefreshToken(req: Req):  Promise<{
  //   user?: { id: string; iat: number; exp: number };
  //   status: number;
  //   success: boolean;
  //   message: string;
  // }>{
    
    
  //   const existRefreshToken : string =await req.cookies.refreshToken
    
  //   if(!existRefreshToken){
  //     console.log("inside hasRefresh - frame error");
  //     return {status:400,success:false,message:"login to use this fecility"}
  //   } 
  //   console.log("inside hasRefresh - frame ref token", existRefreshToken);
  //   const decode = await jwt.verify(existRefreshToken as string, this.JWT_REFRESH_KEY);
  //   console.log("inside hasRefresh - frame", decode);
  //   if(!decode){
  //     return {
  //       status: 400,
  //       success: false,
  //       message: "token has been expired , login to start",
  //     };
  //   }
  //     return {
  //       user: decode as { id: string; iat: number; exp: number },
  //       status: 200,
  //       success: true,
  //       message: "user has been decoded",
  //     };
  // }
}

