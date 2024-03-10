import { IUser } from "../../../../entities/user";
import userModel from "../../models/userModel";

export const getUsers = async (role: string): Promise<IUser[]> => {
  try {
    return await userModel.find({ role: { $eq: role } });
  } catch (error) {
    throw error;
  }
};
