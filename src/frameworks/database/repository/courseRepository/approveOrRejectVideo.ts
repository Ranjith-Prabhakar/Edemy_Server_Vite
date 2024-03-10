import { ICourse } from "../../../../entities/course";
import { ICourseResponse } from "../../../../useCasese/interface/request_And_Response/course";
import courseModel from "../../models/courseModel";

export const approveOrRejectVideo = async (
  courseId: string,
  action: string
): Promise<void | ICourseResponse> => {
  try {
    const result = await courseModel.findByIdAndUpdate(
      courseId,
      { status: action },
      { new: true }
    );
    return {
      status: 200,
      message: "course status has been updated",
      data: result as ICourse,
    };
  } catch (error: any) {
    throw error;
  }
};
