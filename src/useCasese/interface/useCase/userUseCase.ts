import { IUser } from "../../../entities/user";
import { Next, Req, Res } from "../../../frameworks/types/serverPackageTypes";
import { IGeneralResponse } from "../request_And_Response/generalResponse";
import { INotificationResponse } from "../request_And_Response/notification";
import { IJsonResponse } from "../services/jsonResponse";
import { IToken } from "../services/jwt.types";

export interface IUserUseCase {
  registerUser(
    {
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    },
    next: Next
  ): Promise<string | void>;

  createUser(
    verificationCode: string,
    token: string,
    next: Next
  ): Promise<IUser | void>;

  login(
    { email, password }: { email: string; password: string },
    next: Next
  ): Promise<{ user: IUser; tokens: IToken } | void>;

  logout(req: Req, res: Res, next: Next): Promise<void>;
  refresh(req: Req, res: Res, next: Next): Promise<IToken | void>;
  beInstructor(req: Req, next: Next): Promise<IJsonResponse | void>;
  forgotPassword(req: Req, next: Next): Promise<string | void>;
  forgotPasswordOtpVerification(
    req: Req,
    next: Next,
    token: string
  ): Promise<IGeneralResponse | void>;

  resetForgotPassword(
    req: Req,
    token: string,
    next: Next
  ): Promise<IGeneralResponse | void>;
  userSession(req: Req, next: Next): Promise<IUser | void>;
  getNotifications(req: Req, next: Next): Promise<INotificationResponse | void>;
  updateNotifications(
    req: Req,
    next: Next
  ): Promise<{ success: boolean; message: string } | void>;
}
