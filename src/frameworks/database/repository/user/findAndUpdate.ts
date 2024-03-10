import { IJsonResponse } from "../../../../useCasese/interface/services/jsonResponse";
import userModel from "../../models/userModel";

export const findAndUpdate = async (
  data: { [key: string]: string | number },
  userModels: typeof userModel
): Promise<IJsonResponse> => {
  const id = data.userId as string;
  delete data.userId;
  delete data?.agreementId;
  const update = await userModels.findByIdAndUpdate(
    id,
    { role: "instructor" },
    { new: true }
  );
  if (!update) {
    return {
      status: 404,
      success: false,
      message: "User not found",
    } as IJsonResponse;
  } else {
    return {
      status: 200,
      success: true,
      message: "user data updated",
    } as IJsonResponse;
  }
};
