import { IUser } from "../../../../../../entities/user";
import userModel from "../../../models/userModel";

export const verifyUser = async (
  newUser: IUser,
  userModels: typeof userModel
): Promise<{
  user?: IUser;
  status: number;
  success: boolean;
  message: string;
}> => {
  try {
    const user = await userModels.create(newUser);
    await user.save();
    return {
      user,
      status: 200,
      success: true,
      message: "user created successfully",
    };
  } catch (error: any) {
    return { status: 500, success: false, message: `${error.message}` };
  }
};
