import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";
import { UserUsecase } from "../useCasese/useCases/userUseCase";
import { IUserRepository } from "../useCasese/interface/repository/userRepository";

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
      let { name, email, password, confirmPassword } = req.body;
      name = name ? name.trim() : null;
      email = email ? email.trim() : null;
      password = password ? password.trim() : null;
      confirmPassword = confirmPassword ? confirmPassword.trim() : null;

      if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "missing required fields",
        });
      }

      if (name.length < 3) {
        return res.status(400).json({
          success: false,
          message: "name should have atleast 3 characters",
        });
      }

      if (!this.validateEmail(email)) {
        return res.status(400).json({
          success: false,
          message: "invalid email format",
        });
      }

      if (password !== confirmPassword) {
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
        })
        delete newUser.token
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
      let { verificationCode } = req.body;
      let token = req.cookies.verificationToken;
      verificationCode = verificationCode ? verificationCode.trim() : null;
      if (verificationCode.length !== 4) {
        return res.status(400).json({
          success: false,
          message: "missing required fields",
        });
      }
      const result = await this.userUseCase.verifyUser(verificationCode,token);
      console.log('from userusecase',result)
      if(result.success){
        res.clearCookie("verificationToken").send(result);
      }else{
        res.send(result)
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "server error",
      });
    }
  }
}
