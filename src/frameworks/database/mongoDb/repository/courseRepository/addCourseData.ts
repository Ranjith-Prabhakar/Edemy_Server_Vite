import { ICourse } from "../../../../../entities/course";
import { ICourseRepository } from "../../../../../useCasese/interface/repository/courseRepository";
import { ICourseResponse } from "../../../../../useCasese/interface/response/courseResponse";
import courseModel from "../../models/courseModel";

// export const addCourseData = async (
//   courseData: ICourseRepository
// ): Promise<ICourseResponse> => {
//   try {
//     const result = await courseModel.create(courseData);
//     return { status: 200, message: "course has been created ", data: result };
//   } catch (error: any) {
//     throw error;
//   }
// };

export const addCourseData = async (
  courseData: ICourseRepository
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
