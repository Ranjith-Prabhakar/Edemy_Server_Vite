import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";
import { IUserUseCase } from "../useCasese/interface/useCase/userUseCase";
export declare class UserController {
    private userUseCase;
    constructor(userUseCase: IUserUseCase);
    registerUser(req: Req, res: Res, next: Next): Promise<void>;
    createUser(req: Req, res: Res, next: Next): Promise<void>;
    login(req: Req, res: Res, next: Next): Promise<void>;
    logout(req: Req, res: Res, next: Next): Promise<void>;
    refresh(req: Req, res: Res, next: Next): Promise<void>;
    beInstructor(req: Req, res: Res, next: Next): Promise<void>;
    forgotPassword(req: Req, res: Res, next: Next): Promise<void>;
    forgotPasswordOtpVerification(req: Req, res: Res, next: Next): Promise<void>;
    resetForgotPassword(req: Req, res: Res, next: Next): Promise<void>;
    userSession(req: Req, res: Res, next: Next): Promise<void>;
    getNotifications(req: Req, res: Res, next: Next): Promise<void>;
    updateNotifications(req: Req, res: Res, next: Next): Promise<void>;
}
