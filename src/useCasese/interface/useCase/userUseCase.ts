import { IUser } from "../../../entities/user";
import { Next, Req, Res } from "../../../frameworks/types/serverPackageTypes";
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
  resetForgotPassword(req: Req, token: string): Promise<IJsonResponse | void>;
}
