import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { ICourseResponse } from "../../interface/request_And_Response/course";
import ErrorHandler from "../../middlewares/errorHandler";

export const updateCourse = async (
  courseRepository: ICourseRepository,
  userRepository:IUserRepository,
  req: Req,
  next: Next
): Promise<ICourseResponse | void> => {
  try {
    const courseResutl = await courseRepository.updateCourse(req.user?._id as string, req.body);
    if(courseResutl){
      // const userRepoResutl = await userRepository.;
    }
    return courseResutl;

  } catch (error: any) {
    return next(new ErrorHandler(500, error.message));
  }
};
