import { ICourse } from "../../../../../entities/course";
import { ICourseResponse } from "../../../../../useCasese/interface/response/courseResponse";
import courseModel from "../../models/courseModel";

export const getCourseInProgress = async (): Promise<ICourseResponse > => {
  try {
    const result = await courseModel.findOne({
      submissionStatus: "work-in-progress",
    });
    return {status:200,message:"course has been found successfully",data:result as ICourse}
  } catch (error: any) {
    throw error;
  }
};
