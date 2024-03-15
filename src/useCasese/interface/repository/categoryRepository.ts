import { ICategory } from "../../../entities/category";
import { ICategoryResponse } from "../request_And_Response/category";

export interface ICategoryRepository {
  addCategory(category: string): Promise<ICategory>;
  existCategory(category: string): Promise<"exist" | "not exist">;
  getCategories(admin:boolean): Promise<ICategory[] | void>;
  freezCategory(id: string): Promise<ICategoryResponse | void>;
  unFreezCategory(id: string): Promise<ICategoryResponse | void>;
}
