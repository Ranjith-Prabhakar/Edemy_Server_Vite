import categoryModel from "../../models/categoryModel";

export const existCategory = async (
  category: string
): Promise<"exist" | "not exist"> => {
  try {
    const result = await categoryModel.findOne({ name: category });
    console.log("inside repo", result);
    if (result) {
      return "exist";
    } else {
      return "not exist";
    }
  } catch (error) {
    throw error;
  }
};
