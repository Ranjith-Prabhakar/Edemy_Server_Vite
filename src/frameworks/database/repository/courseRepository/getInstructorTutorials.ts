import { ICourseResponse } from "../../../../useCasese/interface/request_And_Response/course";
import courseModel from "../../models/courseModel";

export const getInstructorTutorials = async (
  courses: string[]
): Promise<void | ICourseResponse> => {
  try {
    console.log("courses repo engine", courses);
    const result = await courseModel.find({ _id: { $in: courses } });
    return {
      status: 200,
      message: "instructor tutorials have fetched well",
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
