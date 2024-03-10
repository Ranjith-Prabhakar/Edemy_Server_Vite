import { IJsonResponse } from "../../../../useCasese/interface/services/jsonResponse";
import userModel from "../../models/userModel";

export const findByIdAndUpdate = async (
  id: string,
  data: { [key: string]: string | number }
): Promise<IJsonResponse> => {
  const result = await userModel.findByIdAndUpdate(id, data, { new: true });
  if (result) {
    return {
      status: 200,
      success: true,
      message: "user password has been updated",
    };
  } else {
    return {
      status: 400,
      success: false,
      message: "user not found",
    };
  }
};
