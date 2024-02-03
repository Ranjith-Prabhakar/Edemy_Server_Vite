import { ICategory } from "../../../../entities/category";
import { ICategoryRepository } from "../../../../useCasese/interface/repository/categoryRepository";
import { ICategoryResponse } from "../../../../useCasese/interface/response/categoryResponse";

import {
  addCategory,
  existCategory,
  getCategories,
  freezCategory,
} from "./categoryRepository/index";

export class CategoryRepository implements ICategoryRepository {
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async addCategory(category: string): Promise<ICategory> {
    try {
      return addCategory(category);
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async existCategory(category: string): Promise<"exist" | "not exist"> {
    try {
      return existCategory(category);
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

  async getCategories(): Promise<void | ICategory[]> {
    try {
      return await getCategories();
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async freezCategory(id: string): Promise<ICategoryResponse | void> {
    try {
      return await freezCategory(id);
    } catch (error) {
      throw error;
    }
  }
}
