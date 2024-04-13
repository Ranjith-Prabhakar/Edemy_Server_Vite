import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICategoryRepository } from "../../interface/repository/categoryRepository";
import { ICategoryResponse } from "../../interface/request_And_Response/category";
export declare const unFreezCategory: (req: Req, next: Next, categoryrepository: ICategoryRepository) => Promise<ICategoryResponse | void>;
