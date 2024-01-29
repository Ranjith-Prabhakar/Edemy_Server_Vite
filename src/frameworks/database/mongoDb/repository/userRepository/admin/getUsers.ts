import { IUser } from "../../../../../../entities/user";
import userModel from "../../../models/userModel";

export const getUsers = async (): Promise<IUser[]> => {
  try {
    return await userModel.find({ role: { $eq: "user" } });
  } catch (error) {
    throw error;
  }
};
