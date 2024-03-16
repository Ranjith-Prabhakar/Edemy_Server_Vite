

import ErrorHandler from "../../../../useCasese/middlewares/errorHandler";
import { ICourse } from "../../../../entities/course";
import { ICourseResponse } from "../../../../useCasese/interface/request_And_Response/course";
import courseModel from "../../models/courseModel";

export const getCourseInProgress = async (
  instructor: string
): Promise<ICourseResponse> => {
  try {
    const result = await courseModel.findOne({
      instructor,
      submissionStatus: "work-in-progress",
    });
    if (result === null) throw new ErrorHandler(404, "no courses in progress");
    console.log("result ----->>>", result);
    return {
      status: 200,
      message: "course has been found successfully",
      data: result as ICourse,
    };
  } catch (error: any) {
    throw error;
  }
};
