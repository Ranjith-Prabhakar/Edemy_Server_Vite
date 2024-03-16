

import { ICourse } from "../../../../entities/course";
import { ICourseResponse } from "../../../../useCasese/interface/request_And_Response/course";
import courseModel from "../../models/courseModel";

export const addCourseData = async (
  courseData: ICourse
): Promise<ICourseResponse> => {
  try {
    const result = await courseModel.findOneAndUpdate(
      {
        instructor: courseData.instructor,
        submissionStatus: "work-in-progress",
      },
      { $set: { ...courseData } },
      {
        upsert: true,
        new: true,
      }
    );
    if (result) {
      return {
        status: 201,
        message: "Course data has been created or updated",
        data: result as ICourse,
      };
    } else {
      return {
        status: 404,
        message: "No matching document found or updated",
      };
    }
  } catch (error: any) {
    throw error;
  }
};
