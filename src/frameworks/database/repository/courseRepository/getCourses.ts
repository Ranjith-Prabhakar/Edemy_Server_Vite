import { ICourseResponse } from "../../../../useCasese/interface/request_And_Response/course";
import courseModel from "../../models/courseModel";

export const getCourses = async (): Promise<void | ICourseResponse> => {
  try {
    const result = await courseModel.find({
      status: { $in: ["approved", "freez"] },
    });
    return {
      status: 200,
      message: "existing courses have been fetched successfully",
      data: result,
    };
  } catch (error: any) {
    throw error;
  }
};
