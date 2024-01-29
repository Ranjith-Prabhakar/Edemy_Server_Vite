import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../handler/errorHandler";
import { ICategoryRepository } from "../../interface/repository/categoryRepository";

export const addCategory = async (
  categoryRepository: ICategoryRepository,
  req: Req,
  next: Next
) => {
  try {
    const isExist = await categoryRepository.existCategory(
      req.body.category as string
    );
    if (isExist === "exist") {
      return { success: false, message: "category already exist" };
    } else {
      await categoryRepository.addCategory(req.body.category as string);
      return { success: true, message: "category added successfully" };
    }
  } catch (error: any) {
    return next(new ErrorHandler(500, error.message));
  }
};
