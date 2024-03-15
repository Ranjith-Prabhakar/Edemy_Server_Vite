import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { ICourseCategoryBaseResponse, ICourseResponse } from "../../interface/request_And_Response/course";
import { catchError } from "../../middlewares/catchError";

export const getCourseByCategory = async (
  courseRepository: ICourseRepository,
  req: Req,
  next: Next
): Promise<void | ICourseCategoryBaseResponse> => {
  try {
    let { category, pageNumber, frequency } = req.body;
    pageNumber = +pageNumber;
    frequency = +frequency;

    return await courseRepository.getCourseByCategory(
      category,
      pageNumber,
      frequency
    );
  } catch (error) {
    catchError(error, next);
  }
};
