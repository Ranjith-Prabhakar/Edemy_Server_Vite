import { ICategory } from "../../../entities/category";

export interface ICategoryRepository {
  addCategory(category: string): Promise<boolean>;
  existCategory(category: string): Promise<"exist" | "not exist">;
  getCategories(): Promise<ICategory[] | void>;
}
