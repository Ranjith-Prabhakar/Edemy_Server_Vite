import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { ICloudStorageResponse } from "../../interface/request_And_Response/cloudStorageResponse";
import { ICloudStorage } from "../../interface/services/cloudStorage";
import { catchError } from "../../middlewares/catchError";
import ErrorHandler from "../../middlewares/errorHandler";

export const getVideoForUser = async (
  courseRepository: ICourseRepository,
  cloudStorage: ICloudStorage,
  req: Req,
  next: Next
): Promise<ICloudStorageResponse | void> => {
  try {
    console.log("getVideoForUser ===> engine body", req.body);
    const { courseId, moduleNo, videoNo, videoName } = req.body;

    const isEnrolled = req.user?.enrolledCourses?.includes(courseId);
    console.log("getVideoForUser ===> engine isEnrolled", isEnrolled);
    if (isEnrolled) {
      return await cloudStorage.getVideoPresignedUrl(videoName);
    }
    const isPreview = await courseRepository.isPreview(
      courseId,
      moduleNo,
      videoNo
    );
    console.log("getVideoForUser ===> engine isPreview", isPreview);
    if (isPreview) {
      return await cloudStorage.getVideoPresignedUrl(videoName);
    } else {
      console.log("getVideoForUser ===> engine error");
      return next(
        new ErrorHandler(
          404,
          "you have to purchase the course to watch the video"
        )
      );
    }
  } catch (error) {
    catchError(error, next);
  }
};
