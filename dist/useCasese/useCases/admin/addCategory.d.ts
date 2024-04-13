import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICategoryRepository } from "../../interface/repository/categoryRepository";
export declare const addCategory: (categoryRepository: ICategoryRepository, req: Req, next: Next) => Promise<void | {
    success: boolean;
    message: string;
    data?: undefined;
} | {
    data: import("../../../entities/category").ICategory;
    success: boolean;
    message: string;
}>;
