import { Next, Req, Res } from "../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../middlewares/errorHandler";
import { ICategoryRepository } from "../interface/repository/categoryRepository";
import { IInstructorAgreementRepository } from "../interface/repository/instructorAgreementRepository";
import { IUserRepository } from "../interface/repository/userRepository";
import { IJsonResponse } from "../interface/services/jsonResponse";
import {
  approveInstructor,
  getUsers,
  getUser,
  freezUser,
  addCategory,
  getCategories,
} from "./admin/index";
import { IUser } from "../../entities/user";
import { IAdminUseCase } from "../interface/useCase/adminUseCase";
import { NextFunction } from "express";
import { ICategory } from "../../entities/category";

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
  async approveInstructor(req: Req, next: Next): Promise<IJsonResponse> {
    try {
      return await approveInstructor(
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
  async freezUser(req: Req, next: Next): Promise<boolean | void> {
    try {
      return freezUser(this.userRepository, req, next);
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
      return await getCategories(this.categoryRepository,next)
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
}
