import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICategoryRepository } from "../../interface/repository/categoryRepository";
import { catchError } from "../../middlewares/catchError";

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
      const result = await categoryRepository.addCategory(
        req.body.category as string
      );
      return {
        data: result,
        success: true,
        message: "category added successfully",
      };
    }
  } catch (error) {
    catchError(error,next)
    // return next(new ErrorHandler(500, error.message));
  }
};
