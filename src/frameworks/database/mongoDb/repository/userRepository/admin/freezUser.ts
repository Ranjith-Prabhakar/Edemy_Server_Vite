import { IUserResponse } from "../../../../../../useCasese/interface/response/userResponse";
import userModel from "../../../models/userModel";

export const freezUser = async (id: string): Promise<IUserResponse> => {
  try {
    const result = await userModel.findByIdAndUpdate(id,{ status: "frozen" },{new:true});
    return { success: true, message: "user has been blocked", data: result };;
  } catch (error) {
    throw error;
  }
};
