import { IUser } from '../../entities/user';
import { IJwt, IToken } from "../../useCasese/interface/services/jwt.types";
export declare class JWTtoken implements IJwt {
    JWT_VERIFICATION_KEY: string;
    JWT_ACCESS_KEY: string;
    JWT_REFRESH_KEY: string;
    createVerificationJWT(payLoad: IUser): Promise<string>;
    createAccessAndRefreshToken(_id: string): Promise<IToken>;
    verifyJwt(token: string): Promise<IUser>;
    forgotPasswordToken(userId: string, email: string): Promise<string>;
}
