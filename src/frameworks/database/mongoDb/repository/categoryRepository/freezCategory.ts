import { ICategory } from "../../../../../entities/category";
import { ICategoryResponse } from "../../../../../useCasese/interface/response/categoryResponse";
import categoryModel from "../../models/categoryModel";

export const freezCategory = async (id: string): Promise<ICategoryResponse | void> => {
  try {
    const result = await categoryModel.findByIdAndUpdate(
      id,
      { status: "frozen" },
      { new: true }
    );
    return {
      status: 200,
      message: "category has been blocked",
      data: result as ICategory,
    };
  } catch (error) {
    throw error;
  }
};
