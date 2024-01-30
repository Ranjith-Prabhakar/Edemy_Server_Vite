import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";
import { UserUsecase } from "../useCasese/useCases/userUseCase";
import { inputValidation } from "./middleware/inputValidation";

import {
  accessTokenOptions,
  refreshTokenOptions,
} from "./middleware/tokenOptions";
import ErrorHandler from "../useCasese/middlewares/errorHandler";
import { IJsonResponse } from "../useCasese/interface/services/jsonResponse";

export class UserController {
  private userUseCase: UserUsecase;

  constructor(userUseCase: UserUsecase) {
    this.userUseCase = userUseCase;
  }

  // *****************************************************************************************************************************
  async registerUser(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "registerUser", next);
      const newUser = await this.userUseCase.registerUser(req.body);

      res.cookie("verificationToken", newUser.token, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 30 * 60 * 1000),
      });

      delete newUser.token;

      res.json(newUser);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async verifyUser(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "verifyUser", next);
      let token = req.cookies.verificationToken;
      const result = await this.userUseCase.verifyUser(
        req.body.verificationCode,
        token
      );

      if (result.success) {
        res.clearCookie("verificationToken").send(result);
      } else {
        res.send(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async login(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "login", next);
      const result = await this.userUseCase.login(req.body);
      if (result.success) {
        res.cookie(
          "accessToken",
          result.tokens?.accessToken,
          accessTokenOptions
        );
        res.cookie(
          "refreshToken",
          result.tokens?.accessToken,
          refreshTokenOptions
        );
      }
      delete result.tokens;
      res.send(result);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async logout(req: Req, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.logout(req, res, next);
      res.send(result);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async refresh(req: Req, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.refresh(req, res, next);
      res.cookie("accessToken", result.accessToken);
      res.cookie("refreshToken", result.refreshToken);
      res.status(200).json({ success: true, message: "tokens are updated" });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async beInstructor(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "beInstructor", next);
      const result = (await this.userUseCase.beInstructor(
        req,
        next
      )) as IJsonResponse;
      res.status(result.status).json(result);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async forgotPassword(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "forgotPassword", next);
      const result = (await this.userUseCase.forgotPassword(req, next)) as {
        token: string;
        status: number;
        succuss: boolean;
        message: string;
      };

      res.cookie("verificationToken", result.token);
      result.token = "";
      res.status(200).json(result);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async resetForgotPassword(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "resetForgotPassword", next);
      let token = req.cookies.verificationToken;
      const result = await this.userUseCase.resetForgotPassword(req, token);
      if (result?.success) {
        res.clearCookie("verificationToken").send(result);
      } else {
        res.send(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
}
