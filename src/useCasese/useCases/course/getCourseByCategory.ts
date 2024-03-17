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
    let { category, pageNumber, frequency, sort, filter } = req.body;
    pageNumber = +pageNumber;
    frequency = +frequency;

    return await courseRepository.getCourseByCategory(
      category,
      pageNumber,
      frequency,
      sort,
      filter
    );
  } catch (error) {
    catchError(error, next);
  }
};
