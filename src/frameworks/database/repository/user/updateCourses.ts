import { IUser } from "../../../../entities/user";
import userModel from "../../models/userModel";

export const updateCourses = async (
  courseId: string,
  userId: string
): Promise<IUser | void> => {
  try {
    const result = await userModel.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { courses: courseId } },
      { new: true }
    );
    if (result && result._id) {
      return result;
    }
  } catch (error) {
    throw error;
  }
};
