import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";
import { inputValidation } from "./middleware/inputValidation";

import {
  accessTokenOptions,
  refreshTokenOptions,
} from "./middleware/tokenOptions";

import ErrorHandler from "../useCasese/middlewares/errorHandler";
import { IJsonResponse } from "../useCasese/interface/services/jsonResponse";
import { IToken } from "../useCasese/interface/services/jwt.types";
import { IUserUseCase } from "../useCasese/interface/useCase/userUseCase";

export class UserController {
  private userUseCase: IUserUseCase;

  constructor(userUseCase: IUserUseCase) {
    this.userUseCase = userUseCase;
  }

  // *****************************************************************************************************************************
  async registerUser(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "registerUser", next);
      const token = await this.userUseCase.registerUser(req.body, next);

      res.cookie("verificationToken", token, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 30 * 60 * 1000),
      });

      res.status(200).json({
        success: true,
        message: "verification otp has been sent the mail",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // *****************************************************************************************************************************
  async createUser(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "verifyUser", next);
      let token = req.cookies.verificationToken;
      const result = await this.userUseCase.createUser(
        req.body.verificationCode,
        token,
        next
      );
      res.clearCookie("verificationToken").send(result);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async login(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "login", next);
      const result = await this.userUseCase.login(req.body, next);
      res.cookie("accessToken", result?.tokens.accessToken, accessTokenOptions);
      res.cookie(
        "refreshToken",
        result?.tokens.accessToken,
        refreshTokenOptions
      );
      res
        .status(200)
        .json({ user: result?.user, message: "user loggedIn successfully" });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async logout(req: Req, res: Res, next: Next) {
    try {
      await this.userUseCase.logout(req, res, next);
      res.status(200).json({
        success: true,
        message: "user has been loged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async refresh(req: Req, res: Res, next: Next) {
    try {
      const result = (await this.userUseCase.refresh(req, res, next)) as IToken;
      res.cookie("accessToken", result.accessToken, accessTokenOptions);
      res.cookie("refreshToken", result.refreshToken, refreshTokenOptions);
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
      console.log("after fetch controll", result);
      res.status(result.status).json(result);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async forgotPassword(req: Req, res: Res, next: Next) {
    try {
      console.log("forgotPassword controller time===>", req.body, Date.now());
      await inputValidation(req, "forgotPassword", next);
      const result = await this.userUseCase.forgotPassword(req, next);

      res.cookie("verificationToken", result, {
        sameSite: "strict",
        httpOnly: true,
        maxAge: 5 * 60 * 1000,
      });
      res.status(200).json({
        succuss: true,
        message: "verification code has been sent to your account",
      });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async forgotPasswordOtpVerification(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "forgotPasswordOtpVerification", next);
      const token = req.cookies.verificationToken as string;
      console.log("token", token);
      let result = await this.userUseCase.forgotPasswordOtpVerification(
        req,
        next,
        token
      );
      res.status(200).json(result);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async resetForgotPassword(req: Req, res: Res, next: Next) {
    try {
      console.log("req.body", req.body);
      await inputValidation(req, "resetForgotPassword", next);
      console.log("req.body after validation");

      let token = req.cookies.verificationToken;
      const result = await this.userUseCase.resetForgotPassword(
        req,
        token,
        next
      );

      res.clearCookie("verificationToken");
      res.status(200).send(result);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************

  async userSession(req: Req, res: Res, next: Next) {
    try {
      console.log("userSession result");
      const result = await this.userUseCase.userSession(req, next);
      console.log("userSession result", result);
      res.status(200).json(result);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }

  // *****************************************************************************************************************************

  async getNotifications(req: Req, res: Res, next: Next) {
    try {
      console.log("getNotifications result");
      const result = await this.userUseCase.getNotifications(req, next);
      console.log("getNotifications result", result);
      res.status(200).json(result);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }

  // *****************************************************************************************************************************

  async updateNotifications(req: Req, res: Res, next: Next) {
    try {
      console.log("updateNotifications result", req.body);
      const result = await this.userUseCase.updateNotifications(req, next);
      console.log("getNotifications result", result);
      res.status(200).json(result);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
}
