import { ICategory } from "../../../entities/category";
import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICategoryRepository } from "../../interface/repository/categoryRepository";
import { ICategoryResponse } from "../../interface/response/categoryResponse";
import ErrorHandler from "../../middlewares/errorHandler";

export const unFreezCategory = async (
  req: Req,
  next: Next,
  categoryrepository: ICategoryRepository
): Promise<ICategoryResponse | void> => {
  try {
    return await categoryrepository.unFreezCategory(req.params.id as string);
  } catch (error: any) {
    return next(new ErrorHandler(500, error.message));
  }
};
