import categoryModel from "../../models/categoryModel";

export const addCategory = async (category: string): Promise<boolean> => {
  try {
    await categoryModel.create({name:category});
    return true;
  } catch (error) {
    throw error;
  }
};
