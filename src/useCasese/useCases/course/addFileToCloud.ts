import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { ICloudStorage } from "../../interface/services/cloudStorage";
import ErrorHandler from "../../middlewares/errorHandler";

export const addFileToCloud = async (
  cloudStorage: ICloudStorage,
  courseRepository: ICourseRepository,
  req: Req,
  next: Next
) => {
  try {
    if (!req.body.fromAddModuleVideo) {
      const isCourseExist = await courseRepository.findByName(
        req.body.folderName
      );
      if (isCourseExist) return isCourseExist;
    }

    return await cloudStorage.addFileToCloud(
      req.body.fileName,
      req.body.contentType,
      req.body.userId,
      req.body.folderName
    );
  } catch (error: any) {
    return next(new ErrorHandler(500, error.message));
  }
};
