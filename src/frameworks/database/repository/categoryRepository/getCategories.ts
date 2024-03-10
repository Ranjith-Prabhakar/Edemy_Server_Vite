import { ICategory } from "../../../../entities/category";
import categoryModel from "../../models/categoryModel";

export const getCategories = async (): Promise<ICategory[] | void> => {
  try {
    return await categoryModel.find();
  } catch (error) {
    throw error;
  }
};
