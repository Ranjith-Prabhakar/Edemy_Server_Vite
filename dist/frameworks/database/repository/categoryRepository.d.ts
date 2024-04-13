import { ICategory } from "../../../entities/category";
import { ICategoryRepository } from "../../../useCasese/interface/repository/categoryRepository";
import { ICategoryResponse } from "../../../useCasese/interface/request_And_Response/category";
export declare class CategoryRepository implements ICategoryRepository {
    addCategory(category: string): Promise<ICategory>;
    existCategory(category: string): Promise<"exist" | "not exist">;
    getCategories(admin: boolean): Promise<void | ICategory[]>;
    freezCategory(id: string): Promise<ICategoryResponse | void>;
    unFreezCategory(id: string): Promise<ICategoryResponse | void>;
}
