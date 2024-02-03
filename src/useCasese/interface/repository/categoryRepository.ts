import { ICategory } from "../../../entities/category";
import { ICategoryResponse } from "../response/categoryResponse";

export interface ICategoryRepository {
  addCategory(category: string): Promise<ICategory>;
  existCategory(category: string): Promise<"exist" | "not exist">;
  getCategories(): Promise<ICategory[] | void>;
  freezCategory(id: string): Promise<ICategoryResponse | void>;
}
