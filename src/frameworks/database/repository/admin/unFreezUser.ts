import { IUserResponse } from "../../../../useCasese/interface/request_And_Response/user";
import userModel from "../../models/userModel";

export const unFreezUser = async (id: string): Promise<IUserResponse> => {
  try {
    const result = await userModel.findByIdAndUpdate(
      id,
      { status: "active" },
      { new: true }
    );
    return { success: true, message: "user has been un-blocked", data: result };
  } catch (error) {
    throw error;
  }
};
