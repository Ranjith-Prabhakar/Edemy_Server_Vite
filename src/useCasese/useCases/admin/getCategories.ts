import { ICategory } from "../../../entities/category";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import { ICategoryRepository } from "../../interface/repository/categoryRepository";
import ErrorHandler from "../../middlewares/errorHandler";

export const getCategories = async (
  categoryRepository: ICategoryRepository,
  next: Next
): Promise<ICategory[] | void> => {
  try {
      return await categoryRepository.getCategories(true)
  } catch (error:any) {
    return next(new ErrorHandler(500,error.message))
  }
};
