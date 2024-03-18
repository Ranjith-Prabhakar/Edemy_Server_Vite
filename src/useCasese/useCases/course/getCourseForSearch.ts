import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { ICourseCategoryBaseResponse } from "../../interface/request_And_Response/course";
import { catchError } from "../../middlewares/catchError";

export const getCourseForSearch = async (
  courseRepository: ICourseRepository,
  req: Req,
  next: Next
): Promise<void | ICourseCategoryBaseResponse> => {
  try {
    let { key, pageNumber, frequency, sort, filter } = req.body;
    pageNumber = +pageNumber;
    frequency = +frequency;
    return courseRepository.getCourseForSearch(
      key,
      pageNumber,
      frequency,
      sort,
      filter
    );
  } catch (error) {
    catchError(error, next);
  }
};
