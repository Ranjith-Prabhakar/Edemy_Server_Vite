import { IUser } from "../../../../entities/user";
import userModel from "../../models/userModel";

export const getAdmin = async (): Promise<IUser | void> => {
  try {
    return await userModel.findOne({ role: "admin" }) as IUser;
  } catch (error) {
    throw error;
  }
};
