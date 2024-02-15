import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICloudStorage } from "../../interface/services/cloudStorage";
import ErrorHandler from "../../middlewares/errorHandler";

export const addModule = async(cloudStorage:ICloudStorage ,req: Req, next: Next) => {
  try {
    return await cloudStorage.addModule(req.body.fileName,req.body.contentType,req.body.userId) 
  } catch (error:any) {
    return next(new ErrorHandler(500,error.message))
  }
};
