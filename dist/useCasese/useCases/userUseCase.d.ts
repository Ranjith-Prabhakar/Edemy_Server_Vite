import { Req, Res, Next } from "../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../interface/repository/userRepository";
import { IHashpassword } from "../interface/services/hashPassword";
import { ICreateOtp } from "../interface/services/createOtp";
import { ISendMail } from "../interface/services/sendMail";
import { IOtpRepository } from "../interface/repository/otpRepository";
import { ICloudSession } from "../interface/services/cloudSession";
import { IRequestManagement } from "../interface/services/requestManagement";
import { IJwt, IToken } from "../interface/services/jwt.types";
import { IInstructorAgreementRepository } from "../interface/repository/instructorAgreementRepository";
import { IUserUseCase } from "../interface/useCase/userUseCase";
import { IUser } from "../../entities/user";
import { IJsonResponse } from "../interface/services/jsonResponse";
import { IGeneralResponse } from "../interface/request_And_Response/generalResponse";
import { INotificationRepository } from "../interface/repository/notificationRepository";
import { NextFunction } from "express";
import { INotificationResponse } from "../interface/request_And_Response/notification";
export declare class UserUsecase implements IUserUseCase {
    private readonly userRepository;
    private readonly bcrypt;
    private readonly otpGenerator;
    private readonly sendMail;
    private readonly otpRepository;
    private readonly jwtToken;
    private readonly cloudSession;
    private readonly requestManagement;
    private readonly instructorAgreementRepository;
    private readonly notificationRepository;
    constructor(userRepository: IUserRepository, bcrypt: IHashpassword, otpGenerator: ICreateOtp, sendMail: ISendMail, otpRepository: IOtpRepository, jwtToken: IJwt, cloudSession: ICloudSession, requestManagement: IRequestManagement, instructorAgreementRepository: IInstructorAgreementRepository, notificationRepository: INotificationRepository);
    registerUser({ name, email, password, }: {
        name: string;
        email: string;
        password: string;
    }, next: Next): Promise<string | void>;
    createUser(verificationCode: string, token: string, next: Next): Promise<IUser | void>;
    login({ email, password }: {
        email: string;
        password: string;
    }, next: Next): Promise<{
        user: IUser;
        tokens: IToken;
    } | void>;
    logout(req: Req, res: Res, next: Next): Promise<void>;
    refresh(req: Req, res: Res, next: Next): Promise<IToken | void>;
    beInstructor(req: Req, next: Next): Promise<IJsonResponse | void>;
    forgotPassword(req: Req, next: Next): Promise<string | void>;
    forgotPasswordOtpVerification(req: Req, next: Next, token: string): Promise<IGeneralResponse | void>;
    resetForgotPassword(req: Req, token: string, next: Next): Promise<IGeneralResponse | void>;
    userSession(req: Req, next: Next): Promise<IUser | void>;
    getNotifications(req: Req, next: NextFunction): Promise<void | INotificationResponse>;
    updateNotifications(req: Req, next: NextFunction): Promise<void | {
        success: boolean;
        message: string;
    }>;
}
