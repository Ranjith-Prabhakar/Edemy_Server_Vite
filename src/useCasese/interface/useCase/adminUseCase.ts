import { ICategory } from "../../../entities/category";
import { IUser } from "../../../entities/user";
import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICategoryResponse } from "../response/categoryResponse";
import { IUserResponse } from "../response/userResponse";
import { IJsonResponse } from "../services/jsonResponse";

export interface IAdminUseCase {
  approveInstructor(req: Req, next: Next): Promise<IJsonResponse>;
  getUsers(next: Next): Promise<IUser[] | void>;
  getUser(req: Req, next: Next): Promise<void | IUser>;
  freezUser(req: Req, next: Next): Promise<IUserResponse | void>;
  unFreezUser(req: Req, next: Next): Promise<IUserResponse | void>;
  addCategory(
    req: Req,
    next: Next
  ): Promise<void | {
    success: boolean;
    message: string;
  }>;
  getCategories(next: Next): Promise<ICategory[] | void>;
  freezCategory(req: Req, next: Next): Promise<ICategoryResponse | void>;
  unFreezCategory(req: Req, next: Next): Promise<ICategoryResponse | void>;
}
