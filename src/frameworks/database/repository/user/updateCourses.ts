import userModel from "../../models/userModel";

export const updateCourses = async (
  courseId: string,
  userId: string
): Promise<boolean | void> => {
  try {
    const result = await userModel.updateOne(
      { _id: userId },
      { $addToSet: { courses: courseId } }
    );
    if (result) return true;
    else false;
  } catch (error) {
    throw error;
  }
};
