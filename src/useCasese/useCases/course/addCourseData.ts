import { ICourse } from "../../../entities/course";
import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { ICourseResponse } from "../../interface/request_And_Response/course";
import { ICloudSession } from "../../interface/services/cloudSession";
import ErrorHandler from "../../middlewares/errorHandler";

export const addCourseData = async (
  courseRepository: ICourseRepository,
  userRepository: IUserRepository,
  cloudSesssion: ICloudSession,
  req: Req,
  next: Next
): Promise<ICourseResponse | void> => {
  try {
    console.log("req.user 4 5 4 5 4", req.user);
    const courseResult = await courseRepository.addCourseData({
      ...req.body,
      instructor: req.user,
      price: req.body.price * 1,
    });
    const courseData = courseResult.data as ICourse;
    const userResult = await userRepository.updateCourses(
      courseData?._id,
      req.user?._id as string
    );
    if (userResult) {
      await cloudSesssion.createUserSession(
        userResult._id as string,
        userResult
      );
    }
    console.log("userResult === >>>>", userResult);
    return courseResult;
  } catch (error: any) {
    next(new ErrorHandler(500, error.message));
  }
};
