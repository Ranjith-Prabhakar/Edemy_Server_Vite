import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICloudStorageResponse } from "../../interface/request_And_Response/cloudStorageResponse";
import { ICloudStorage } from "../../interface/services/cloudStorage";
import { catchError } from "../../middlewares/catchError";

export const getVideoPresignedUrl = async (
  cloudStorage: ICloudStorage,
  req: Req,
  next: Next
): Promise<void | ICloudStorageResponse> => {
  try {
    return await cloudStorage.getVideoPresignedUrl(req.body.videoName);
  } catch (error) {
    catchError(error,next)
  }
};
