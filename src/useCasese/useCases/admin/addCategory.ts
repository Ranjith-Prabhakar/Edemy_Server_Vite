import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../middlewares/errorHandler";
import { ICategoryRepository } from "../../interface/repository/categoryRepository";

export const addCategory = async (
  categoryRepository: ICategoryRepository,
  req: Req,
  next: Next
) => {
  try {
    console.log("reached=>>addCategory", req.body);
    const isExist = await categoryRepository.existCategory(
      req.body.category as string
    );
    if (isExist === "exist") {
      console.log("reached=>>addCategory === exist");
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
  } catch (error: any) {
    return next(new ErrorHandler(500, error.message));
  }
};
