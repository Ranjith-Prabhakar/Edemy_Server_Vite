import { ICategory } from "../../../../entities/category";
import categoryModel from "../../models/categoryModel";

export const addCategory = async (category: string): Promise<ICategory> => {
  try {
    let result = await categoryModel.create({ name: category });
    return result;
  } catch (error) {
    throw error;
  }
};
