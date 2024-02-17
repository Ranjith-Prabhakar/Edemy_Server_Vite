import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { ICloudStorage } from "../../interface/services/cloudStorage";
import ErrorHandler from "../../middlewares/errorHandler";

export const addModule = async (
  cloudStorage: ICloudStorage,
  courseRepository: ICourseRepository,
  req: Req,
  next: Next
) => {
  try {
    const isCourseExist = await courseRepository.findByName(
      req.body.courseName
    );
    if (isCourseExist) return isCourseExist; 
    return await cloudStorage.addModule(
      req.body.fileName,
      req.body.contentType,
      req.body.userId
    );
  } catch (error: any) {
    return next(new ErrorHandler(500, error.message));
  }
};
