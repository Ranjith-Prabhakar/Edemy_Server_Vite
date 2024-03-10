import { IUser } from "../../../../entities/user";
import userModel from "../../models/userModel";

export const createUser = async (
  newUser: IUser,
  userModels: typeof userModel
): Promise<IUser> => {
  try {
    const user = await userModels.create(newUser);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};
