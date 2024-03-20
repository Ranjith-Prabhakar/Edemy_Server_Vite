import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { ICourseTrackingRepository } from "../../interface/repository/courseTrackingRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import {
  ICloudStorageResponse,
  IExtendedCloudStorageResponse,
} from "../../interface/request_And_Response/cloudStorageResponse";
import { ICloudStorage } from "../../interface/services/cloudStorage";
import { catchError } from "../../middlewares/catchError";
import ErrorHandler from "../../middlewares/errorHandler";

export const getVideoForUser = async (
  courseRepository: ICourseRepository,
  cloudStorage: ICloudStorage,
  courseTrackingRepository: ICourseTrackingRepository,
  req: Req,
  next: Next
): Promise<IExtendedCloudStorageResponse | void> => {
  try {
    const { courseId, moduleNo, videoNo, videoName } = req.body;
    console.log("req.user?.courses", req.user?.courses);
    console.log("courseId", courseId);
    if (req.user?.role === "admin") {
      ///
      const position = await courseTrackingRepository.getVideoTracking(
        courseId,
        req.user._id as string,
        moduleNo,
        videoNo
      );
      if (position) {
        const cloudResponse = await cloudStorage.getVideoPresignedUrl(
          videoName
        );
        return { ...(cloudResponse as ICloudStorageResponse), ...position };
      } else {
        return await cloudStorage.getVideoPresignedUrl(videoName);
      }
    } else if (
      req.user?.role === "instructor" &&
      req.user?.courses?.includes(courseId)
    ) {
      ///
      const position = await courseTrackingRepository.getVideoTracking(
        courseId,
        req.user._id as string,
        moduleNo,
        videoNo
      );
      ///
      if (position) {
        const cloudResponse = await cloudStorage.getVideoPresignedUrl(
          videoName
        );
        return { ...(cloudResponse as ICloudStorageResponse), ...position };
      } else {
        return await cloudStorage.getVideoPresignedUrl(videoName);
      }
    } else {
      const isEnrolled = req.user?.enrolledCourses?.includes(courseId);
      if (isEnrolled) {
        ///
        const position = await courseTrackingRepository.getVideoTracking(
          courseId,
          req.user?._id as string,
          moduleNo,
          videoNo
        );
        ///
        if (position) {
          const cloudResponse = await cloudStorage.getVideoPresignedUrl(
            videoName
          );
          return { ...(cloudResponse as ICloudStorageResponse), ...position };
        } else {
          return await cloudStorage.getVideoPresignedUrl(videoName);
        }
      }
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
    }
  } catch (error) {
    catchError(error, next);
  }
};
