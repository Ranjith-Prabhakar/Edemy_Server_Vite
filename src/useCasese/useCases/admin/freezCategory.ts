import { ICategory } from "../../../entities/category";
import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICategoryRepository } from "../../interface/repository/categoryRepository";
import { ICategoryResponse } from "../../interface/request_And_Response/category";
import ErrorHandler from "../../middlewares/errorHandler";

export const freezCategory = async (
  req: Req,
  next: Next,
  categoryrepository: ICategoryRepository
): Promise<ICategoryResponse | void> => {
  try {
    return await categoryrepository.freezCategory(req.params.id as string);
  } catch (error: any) {
    return next(new ErrorHandler(500, error.message));
  }
};
