
import { Next, Req, Res } from "../../frameworks/types/serverPackageTypes"
import ErrorHandler from "../handler/errorHandler"
import { IUserRepository } from "../interface/repository/userRepository"
import { IJsonResponse } from "../interface/services/jsonResponse";
import {approveInstructor} from "./admin/index"

export class AdminUseCase {
  private readonly userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async approveInstructor(req: Req, res: Res, next: Next):Promise<IJsonResponse>{
    try {
      return await approveInstructor(this.userRepository,req,next);
    } catch (error) {
      return next(new ErrorHandler(500, "internal server error")) as any;
    }
  }
}