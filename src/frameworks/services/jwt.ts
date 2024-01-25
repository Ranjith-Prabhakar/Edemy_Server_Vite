import User from '../../entities/user';
import jwt from '../../useCasese/interface/services/jwt.types' 
import JWT, { Secret } from 'jsonwebtoken'
require('dotenv').config();

interface JwtTokens {
    accessToken: string;
    refreshToken: string;
  }
 
  
class JWTtoken implements jwt {


async verificationToken(user:User):Promise<string>{
  try {
    const jwtVerification = process.env.JWT_SECRET_KEY
    const verificationToken = await JWT.sign({user },jwtVerification as Secret, { expiresIn: '30m' });
    return verificationToken
  } catch (error) {
    throw new Error('JWT_SECRET_KEY is not defined');
  }

}


 async createJWT(userId: string, role: string, isApproved: boolean): Promise<JwtTokens> {

  try {
    
    const jwtKey = process.env.JWT_SECRET_KEY;
    const refreshKey = process.env.JWT_REFRESH_KEY;

    
  
    if (jwtKey && refreshKey ) {
      const accessToken: string = JWT.sign({ id: userId, role, isApproved }, jwtKey, { expiresIn: '24h' });
  
  
    const refreshToken: string = JWT.sign({ id: userId, role, isApproved }, refreshKey);
          
          return ({accessToken,refreshToken});
  
      }
      throw new Error('JWT_KEY or JWT_REFRESH_KEY is not defined');
    } catch (error) {
      throw new Error('JWT_KEY or JWT_REFRESH_KEY is not defined');
      
  }

    
    }
    

    // verifyJWT(data: any): any {
    //     const verify = JWT.verify(data, `${process.env.JWT_SECRET_KEY}`)
    //     return verify;
    // }

}

export default JWTtoken