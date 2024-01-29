import userModel from "../../../models/userModel";
import { IUser } from "../../../../../../entities/user";
export const findUserForLoin = async (
  email: string,
  userModels: typeof userModel
): Promise<{
  user?: IUser;
  status: number;
  success: boolean;
  message: string;
}> => {
  const user = await userModels.findOne({ email }).select("+password");
  if (user) {
    return { user, status: 200, success: true, message: "user has been found" };
  } else {
    return { status: 400, success: false, message: "invalid email id" };
  }
};
