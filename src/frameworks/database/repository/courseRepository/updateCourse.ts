import { ICourse } from "../../../../entities/course";
import { ICourseResponse } from "../../../../useCasese/interface/request_And_Response/course";
import courseModel from "../../models/courseModel";

export const updateCourse = async (
  instructor: string,
  datum: { [key: string]: string }
): Promise<ICourseResponse> => {
  try {
    const result = await courseModel.findOneAndUpdate(
      {
        instructor,
        submissionStatus: "work-in-progress",
      },
      { $set: { ...datum } },
      { new: true }
    );

    console.log("result from updateCourse", datum);
    if (result) {
      return {
        status: 200,
        message: "Document has been updated successfully",
        data: result as ICourse,
      };
    } else {
      return {
        status: 404,
        message: "No document was updated",
      };
    }
  } catch (error: any) {
    throw error;
  }
};
