import { AdminUseCase } from "../useCasese/useCases/adminUseCase";
import {Req,Res,Next} from "../frameworks/types/serverPackageTypes"
import ErrorHandler from "../useCasese/handler/errorHandler";
import { IJsonResponse } from "../useCasese/interface/services/jsonResponse";

export class AdminController {
  private readonly adminUseCase: AdminUseCase;

  constructor(adminUseCase: AdminUseCase) {
    this.adminUseCase = adminUseCase;
  }
  // *****************************************************************************************************************************
  async approveInstructor(req: Req, res: Res, next: Next){
    try {
      const result = await this.adminUseCase.approveInstructor(req,res,next)

      res.status(result.status).json(result);
    } catch (error) {
      return next(new ErrorHandler(500,"internal server error"))      
    }
  }
}