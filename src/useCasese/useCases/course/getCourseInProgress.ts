import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { ICourseResponse } from "../../interface/request_And_Response/course";
import { catchError } from "../../middlewares/catchError";

export const getCourseInProgress = async (
  courseRepository: ICourseRepository,
  req: Req,
  next: Next
): Promise<ICourseResponse | void> => {
  try {
    return await courseRepository.getCourseInProgress(req.user?._id as string);
  } catch (error) {
    catchError(error,next)
  }
};
