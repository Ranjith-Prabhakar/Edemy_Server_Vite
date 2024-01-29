import { ICategoryRepository } from "../../../../useCasese/interface/repository/categoryRepository";

import { addCategory, existCategory } from "./categoryRepository/index";

export class CategoryRepository implements ICategoryRepository {
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async addCategory(category: string): Promise<boolean> {
    try {
      return addCategory(category);
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async existCategory(category: string): Promise<"exist" | "not exist"> {
  try {
    return existCategory(category)
  } catch (error) {
    throw error
  }  
  }
}
