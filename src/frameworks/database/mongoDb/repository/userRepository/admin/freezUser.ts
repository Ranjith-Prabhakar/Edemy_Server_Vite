import userModel from "../../../models/userModel";

export const freezUser = async (id: string): Promise<boolean> => {
  try {
    await userModel.updateOne({ _id: id }, { $update: { status: "freez" } });
    return true;
  } catch (error) {
    throw error;
  }
};
