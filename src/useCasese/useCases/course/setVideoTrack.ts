import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseTrackingRepository } from "../../interface/repository/courseTrackingRepository";
import { ICourseTrackResponse } from "../../interface/request_And_Response/courseTrack";
import { catchError } from "../../middlewares/catchError";

export const setVideoTrack = async (
  courseTrackingRepository: ICourseTrackingRepository,
  req: Req,
  next: Next
): Promise<void | ICourseTrackResponse> => {
  try {
    const {
      userId,
      courseId,
      moduleNo,
      moduleTittle,
      videoNo,
      videoTittle,
      position,
      complete,
    } = req.body;
    return await courseTrackingRepository.setVideoTracking({
      userId,
      courseId,
      moduleNo,
      moduleTittle,
      videoNo,
      videoTittle,
      position,
      complete,
    });
  } catch (error) {
    catchError(error, next);
  }
};
