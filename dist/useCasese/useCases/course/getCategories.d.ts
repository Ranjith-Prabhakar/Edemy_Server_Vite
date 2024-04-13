import { ICategory } from "../../../entities/category";
import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICategoryRepository } from "../../interface/repository/categoryRepository";
export declare const getCategories: (categoryRepository: ICategoryRepository, req: Req, next: Next) => Promise<ICategory[] | void>;
