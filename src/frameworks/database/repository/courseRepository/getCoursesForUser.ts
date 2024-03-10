import { ICourseResponse } from "../../../../useCasese/interface/request_And_Response/course";
import courseModel from "../../models/courseModel";

export const getCoursesForUser = async (): Promise<void | ICourseResponse> => {
  try {
    const result = await courseModel.find({ status: "approved" });
    return { status: 200, message: "courses have been fetched", data: result };
  } catch (error: any) {
    throw error;
  }
};
