import courseModel from "../../models/courseModel";

export const findByName = async (
  courseName: string
): Promise<string | void> => {
  try {
    console.log("reaches findbyname in course repository");
    const result = await courseModel.findOne({ courseName });
    if (result) return "a course already exist in this name";
    return;
  } catch (error: any) {
    throw error;
  }
};
