import { AdminUseCase } from "../useCasese/useCases/adminUseCase";
import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";
import ErrorHandler from "../useCasese/handler/errorHandler";

export class AdminController {
  private readonly adminUseCase: AdminUseCase;

  constructor(adminUseCase: AdminUseCase) {
    this.adminUseCase = adminUseCase;
  }
  // *****************************************************************************************************************************
  async approveInstructor(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.approveInstructor(req, next);

      res.status(result.status).json(result);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async getUsers(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.getUsers(next);
      console.log("result", result);
      res.status(200).json({
        success: true,
        message: "users have been fetched successfully ",
        users: result,
      });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async getUser(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.getUser(req, next);
      console.log("admin controller getUser", result);
      res.status(200).json({
        success: true,
        message: "user have been fetched successfully",
        user: result,
      });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
}
