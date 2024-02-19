import { Next, Req, Res } from "../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../middlewares/errorHandler";
import { ICategoryRepository } from "../interface/repository/categoryRepository";
import { IInstructorAgreementRepository } from "../interface/repository/instructorAgreementRepository";
import { IUserRepository } from "../interface/repository/userRepository";
import {
  approveOrRejectInstructor,
  getUsers,
  getUser,
  freezUser,
  unFreezUser,
  getInstructors,
  addCategory,
  getCategories,
  freezCategory,
  unFreezCategory,
  instructorRequests,
} from "./admin/index";
import { IUser } from "../../entities/user";
import { IAdminUseCase } from "../interface/useCase/adminUseCase";
import { NextFunction } from "express";
import { ICategory } from "../../entities/category";
import { ICategoryResponse } from "../interface/request_And_Response/category";
import { IUserResponse } from "../interface/request_And_Response/user";
import { IInstructorAgreementResponse } from "../interface/request_And_Response/instructorAgreement";

export class AdminUseCase implements IAdminUseCase {
  private readonly userRepository: IUserRepository;
  private readonly instrctorAgreementRepository: IInstructorAgreementRepository;
  private readonly categoryRepository: ICategoryRepository;
  constructor(
    userRepository: IUserRepository,
    instrctorAgreementRepository: IInstructorAgreementRepository,
    categoryRepository: ICategoryRepository
  ) {
    this.userRepository = userRepository;
    this.instrctorAgreementRepository = instrctorAgreementRepository;
    this.categoryRepository = categoryRepository;
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async approveOrRejectInstructor(
    req: Req,
    next: Next
  ): Promise<IInstructorAgreementResponse> {
    try {
      return await approveOrRejectInstructor(
        this.userRepository,
        this.instrctorAgreementRepository,
        req,
        next
      );
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message)) as any;
    }
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async instructorRequests(next: NextFunction): Promise<void | object> {
    try {
      return await instructorRequests(this.instrctorAgreementRepository, next);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }

  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getUsers(next: Next): Promise<IUser[] | void> {
    try {
      return await getUsers(this.userRepository, next);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getUser(req: Req, next: Next): Promise<void | IUser> {
    try {
      return await getUser(this.userRepository, req, next);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async freezUser(req: Req, next: Next): Promise<IUserResponse | void> {
    try {
      return freezUser(this.userRepository, req, next);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async unFreezUser(req: Req, next: Next): Promise<IUserResponse | void> {
    try {
      return unFreezUser(this.userRepository, req, next);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getInstructors(next: Next): Promise<IUser[] | void> {
    try {
      return await getInstructors(this.userRepository, next);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async addCategory(
    req: Req,
    next: Next
  ): Promise<void | {
    success: boolean;
    message: string;
  }> {
    try {
      return await addCategory(this.categoryRepository, req, next);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getCategories(next: NextFunction): Promise<void | ICategory[]> {
    try {
      return await getCategories(this.categoryRepository, next);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async freezCategory(
    req: Req,
    next: NextFunction
  ): Promise<ICategoryResponse | void> {
    try {
      return await freezCategory(req, next, this.categoryRepository);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async unFreezCategory(
    req: Req,
    next: NextFunction
  ): Promise<ICategoryResponse | void> {
    try {
      return await unFreezCategory(req, next, this.categoryRepository);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
}
