import { ICategory } from "../../../entities/category";
import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICategoryRepository } from "../../interface/repository/categoryRepository";
import ErrorHandler from "../../middlewares/errorHandler";

export const getCategories = async (
  categoryRepository: ICategoryRepository,
  req: Req,
  next: Next
): Promise<ICategory[] | void> => {
  try {
    if(req.user?.role === "admin"){
return await categoryRepository.getCategories(true);
    }else{
      return await categoryRepository.getCategories(false);
    }
    
  } catch (error: any) {
    next(new ErrorHandler(500, error.message));
  }
};
