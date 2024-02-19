import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";
import ErrorHandler from "../useCasese/middlewares/errorHandler";
import { inputValidation } from "./middleware/inputValidation";
import { IAdminUseCase } from "../useCasese/interface/useCase/adminUseCase";

export class AdminController {
  private readonly adminUseCase: IAdminUseCase;

  constructor(adminUseCase: IAdminUseCase) {
    this.adminUseCase = adminUseCase;
  }
  // *****************************************************************************************************************************
  async approveOrRejectInstructor(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "approveInstructor", next);
      const result = await this.adminUseCase.approveOrRejectInstructor(req, next);
      res.status(result.status as number).json(result);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async instructorRequests(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.instructorRequests(next);
      res.status(200).json(result);
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
        data: result,
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
  // *****************************************************************************************************************************
  async freezUser(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.freezUser(req, next);
      res.status(200).json(result);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async unFreezUser(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.unFreezUser(req, next);
      res.status(200).json(result);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async getInstructors(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.getInstructors(next);
      console.log("admin controller getUser", result);
      res.status(200).json({
        success: true,
        message: "instructors have been fetched successfully",
        data: result,
      });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async addCategory(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "addCategory", next);
      const result = await this.adminUseCase.addCategory(req, next);
      console.log("addCategory controller", result);
      res.status(200).json(result);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async getCategories(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.getCategories(next);
      res.status(200).json({
        success: true,
        message: "data fetched successfully",
        data: result,
      });
      console.log("reachig here inside of controller", result);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async freezCategory(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.freezCategory(req, next);
      res.status(200).json(result);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // *****************************************************************************************************************************
  async unFreezCategory(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.unFreezCategory(req, next);
      res.status(200).json(result);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
}
