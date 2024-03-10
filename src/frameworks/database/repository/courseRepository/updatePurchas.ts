import courseModel from "../../models/courseModel";

export const updatePurchas = async (
  courseId: string
): Promise<boolean | void> => {
  try {
    console.log(
      "inside updatePurchas repo enging courseId",
      courseId,
      typeof courseId
    );
    const result = await courseModel.findOneAndUpdate(
      { _id: courseId },
      { $inc: { noOfPurchase: 1 } }
    );
    console.log("inside updatePurchas repo enging result", result);

    return !!result;
  } catch (error) {
    throw error;
  }
};
