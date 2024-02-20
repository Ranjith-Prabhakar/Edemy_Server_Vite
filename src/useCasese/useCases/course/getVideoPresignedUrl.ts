import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICloudStorageResponse } from "../../interface/request_And_Response/cloudStorageResponse";
import { ICloudStorage } from "../../interface/services/cloudStorage";
import ErrorHandler from "../../middlewares/errorHandler";

export const getVideoPresignedUrl = async (
  cloudStorage: ICloudStorage,
  req: Req,
  next: Next
): Promise<void | ICloudStorageResponse> => {
  try {
    console.log("req in getVideoPresignedUrl", req.body);
    return await cloudStorage.getVideoPresignedUrl(req.body.videoName);
  } catch (error: any) {
    return next(new ErrorHandler(500, error.message));
  }
};
