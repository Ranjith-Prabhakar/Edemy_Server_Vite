import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";
import { UserUsecase } from "../useCasese/useCases/userUseCase";
import { IUserRepository } from "../useCasese/interface/repository/userRepository";
import {
  accessTokenOptions,
  refreshTokenOptions,
} from "./middleware/tokenOptions";

export class UserController {
  private userUseCase: UserUsecase;
  private userRepository: IUserRepository;

  constructor(userUseCase: UserUsecase, userRepository: IUserRepository) {
    this.userUseCase = userUseCase;
    this.userRepository = userRepository;
  }

  // validate email
  validateEmail(email: string): boolean {
    let emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  // *****************************************************************************************************************************
  async registerUser(req: Req, res: Res, next: Next) {
    try {
      // let { name, email, password, confirmPassword } = req.body;
      req.body.name = req.body.name ? req.body.name.trim() : null;
      req.body.email = req.body.email ? req.body.email.trim() : null;
      req.body.password = req.body.password ? req.body.password.trim() : null;
      req.body.confirmPassword = req.body.confirmPassword
        ? req.body.confirmPassword.trim()
        : null;

      if (
        !req.body.name ||
        !req.body.email ||
        !req.body.password ||
        !req.body.confirmPassword
      ) {
        return res.status(400).json({
          success: false,
          message: "missing required fields",
        });
      }

      if (req.body.name.length < 3) {
        return res.status(400).json({
          success: false,
          message: "name should have atleast 3 characters",
        });
      }

      if (!this.validateEmail(req.body.email)) {
        return res.status(400).json({
          success: false,
          message: "invalid email format",
        });
      }

      if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "password mismatches",
        });
      }
      const newUser = await this.userUseCase.registerUser(req.body);

      res.cookie("verificationToken", newUser.token, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 30 * 60 * 1000),
      });
      delete newUser.token;
      res.json(newUser);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "server error",
      });
    }
  }
  // *****************************************************************************************************************************
  async verifyUser(req: Req, res: Res, next: Next) {
    try {
      // let { verificationCode } = req.body;
      let token = req.cookies.verificationToken;
      req.body.verificationCode = req.body.verificationCode
        ? req.body.verificationCode.trim()
        : null;
      if (req.body.verificationCode.length !== 4) {
        return res.status(400).json({
          success: false,
          message: "missing required fields",
        });
      }
      const result = await this.userUseCase.verifyUser(
        req.body.verificationCode,
        token
      );
      console.log("from userusecase", result);
      if (result.success) {
        res.clearCookie("verificationToken").send(result);
      } else {
        res.send(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "server error",
      });
    }
  }
  // *****************************************************************************************************************************
  async login(req: Req, res: Res, next: Next) {
    req.body.email.trim();
    req.body.password.trim();
    const result = await this.userUseCase.login(req.body);
    if (result.success) {
      res.cookie("accessToken", result.tokens?.accessToken, accessTokenOptions);
      res.cookie(
        "refreshToken",
        result.tokens?.accessToken,
        refreshTokenOptions
      );
    }
    res.send(result);
  }
  // *****************************************************************************************************************************
  async logout(req: Req, res: Res, next: Next){
    const result = await this.userUseCase.logout(req,res,next);
    console.log("first",result)
    res.send(result); 
  }
}
