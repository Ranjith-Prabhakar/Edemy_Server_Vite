import { ICategory } from "../../../../../entities/category";
import { ICategoryResponse } from "../../../../../useCasese/interface/response/categoryResponse";
import categoryModel from "../../models/categoryModel";

export const unFreezCategory = async (
  id: string
): Promise<ICategoryResponse | void> => {
  try {
    const result = await categoryModel.findByIdAndUpdate(
      id,
      { status: "active" },
      { new: true }
    );
    console.log("unFreezCategory", result);
    return {
      status: 200,
      message: "category has been updated successfully",
      data: result as ICategory,
    };
  } catch (error) {
    throw error;
  }
};
