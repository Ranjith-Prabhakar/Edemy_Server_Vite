import courseModel from "../../models/courseModel";

export const updatePurchas = async (
  courseId: string
): Promise<boolean | void> => {
  try {
    
    const result = await courseModel.findOneAndUpdate(
      { _id: courseId },
      { $inc: { noOfPurchase: 1 } }
    );

    return !!result;
  } catch (error) {
    throw error;
  }
};
