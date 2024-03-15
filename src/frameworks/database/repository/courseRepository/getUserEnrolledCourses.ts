import { ICourseResponse } from "../../../../useCasese/interface/request_And_Response/course";
import courseModel from "../../models/courseModel";

export const getUserEnrolledCourses = async (
  courses: string[]
): Promise<void | ICourseResponse> => {
  try {
    const result = await courseModel.find({ _id: { $in: courses } });
    return {
      status: 200,
      message: "user enrolled courses fetched well",
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
