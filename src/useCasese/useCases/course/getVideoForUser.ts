import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { ICloudStorage } from "../../interface/services/cloudStorage";
import { catchError } from "../../middlewares/catchError";

export const getVideoForUser = async(
  courseRepository: ICourseRepository,
  cloudStorage:ICloudStorage,
  req: Req,
  next: Next
): Promise<string | void> => {
  try {
      console.log("getVideoForUser ===> engine body",req.body);

    const isEnrolled = req.user?.enrolledCourses?.includes(req.body.courseId)
    console.log("getVideoForUser ===> engine isEnrolled", isEnrolled);
    if(isEnrolled){
      
      const cloudStorageResponse = await cloudStorage.getVideoPresignedUrl(req.body.videoName)
      console.log("cloudStorageResponse", cloudStorageResponse);
    }
    // const isPreview = await courseRepository.isPreview()
  } catch (error) {
    catchError(error,next)
  }
};
