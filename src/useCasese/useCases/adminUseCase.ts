
import { Next, Req, Res } from "../../frameworks/types/serverPackageTypes"
import ErrorHandler from "../handler/errorHandler"
import { IInstructorAgreementRepository } from "../interface/repository/instructorAgreementRepository";
import { IUserRepository } from "../interface/repository/userRepository"
import { IJsonResponse } from "../interface/services/jsonResponse";
import {approveInstructor,getUsers} from "./admin/index"

export class AdminUseCase {
  private readonly userRepository: IUserRepository;
  private readonly instrctorAgreementRepository:IInstructorAgreementRepository
  constructor(userRepository: IUserRepository,instrctorAgreementRepository:IInstructorAgreementRepository) {
    this.userRepository = userRepository;
    this.instrctorAgreementRepository = instrctorAgreementRepository;
  }

  async approveInstructor(
    req: Req,
    res: Res,
    next: Next
  ): Promise<IJsonResponse> {
    try {
      return await approveInstructor(this.userRepository,this.instrctorAgreementRepository, req, next);
    } catch (error) {
      return next(new ErrorHandler(500, "internal server error")) as any;
    }
  }

  async getUsers(next:Next){
    return await getUsers(this.userRepository, next);
  }
}