import { Next, Req } from "../../frameworks/types/serverPackageTypes";
import { ICategoryRepository } from "../interface/repository/categoryRepository";
import { IInstructorAgreementRepository } from "../interface/repository/instructorAgreementRepository";
import { IUserRepository } from "../interface/repository/userRepository";
import { IUser } from "../../entities/user";
import { IAdminUseCase } from "../interface/useCase/adminUseCase";
import { NextFunction } from "express";
import { ICategory } from "../../entities/category";
import { ICategoryResponse } from "../interface/request_And_Response/category";
import { IUserResponse } from "../interface/request_And_Response/user";
import { IInstructorAgreementResponse } from "../interface/request_And_Response/instructorAgreement";
import { INotificationRepository } from "../interface/repository/notificationRepository";
export declare class AdminUseCase implements IAdminUseCase {
    private readonly userRepository;
    private readonly instrctorAgreementRepository;
    private readonly categoryRepository;
    private readonly notificationRepository;
    constructor(userRepository: IUserRepository, instrctorAgreementRepository: IInstructorAgreementRepository, categoryRepository: ICategoryRepository, notificationRepository: INotificationRepository);
    approveOrRejectInstructor(req: Req, next: Next): Promise<IInstructorAgreementResponse>;
    instructorRequests(next: NextFunction): Promise<void | object>;
    getUsers(next: Next): Promise<IUser[] | void>;
    getUser(req: Req, next: Next): Promise<void | IUser>;
    freezUser(req: Req, next: Next): Promise<IUserResponse | void>;
    unFreezUser(req: Req, next: Next): Promise<IUserResponse | void>;
    getInstructors(next: Next): Promise<IUser[] | void>;
    addCategory(req: Req, next: Next): Promise<void | {
        success: boolean;
        message: string;
    }>;
    getCategories(next: NextFunction): Promise<void | ICategory[]>;
    freezCategory(req: Req, next: NextFunction): Promise<ICategoryResponse | void>;
    unFreezCategory(req: Req, next: NextFunction): Promise<ICategoryResponse | void>;
}
