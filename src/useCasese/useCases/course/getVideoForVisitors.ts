import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { ICloudStorageResponse } from "../../interface/request_And_Response/cloudStorageResponse";
import { ICloudStorage } from "../../interface/services/cloudStorage";
import { catchError } from "../../middlewares/catchError";
import ErrorHandler from "../../middlewares/errorHandler";

export const getVideoForVisitors = async (
  courseRepository: ICourseRepository,
  cloudStorage: ICloudStorage,
  req: Req,
  next: Next
): Promise<ICloudStorageResponse | void> => {
  try {
    const { courseId, moduleNo, videoNo, videoName } = req.body;
    const isPreview = await courseRepository.isPreview(
      courseId,
      moduleNo,
      videoNo
    );
    if (isPreview) {
      return await cloudStorage.getVideoPresignedUrl(videoName);
    } else {
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
