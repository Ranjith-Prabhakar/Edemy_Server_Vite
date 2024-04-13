import { ICategory } from "../../../entities/category";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import { ICategoryRepository } from "../../interface/repository/categoryRepository";
export declare const getCategories: (categoryRepository: ICategoryRepository, next: Next) => Promise<ICategory[] | void>;
