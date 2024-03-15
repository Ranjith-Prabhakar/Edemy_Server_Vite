import { ICategory } from "../../../../entities/category";
import categoryModel from "../../models/categoryModel";

export const getCategories = async (
  admin: boolean
): Promise<ICategory[] | void> => {
  try {
    if (admin) {
      return await categoryModel.find();
    } else {
      return await categoryModel.find({ status: "active" });
    }
  } catch (error) {
    throw error;
  }
};
