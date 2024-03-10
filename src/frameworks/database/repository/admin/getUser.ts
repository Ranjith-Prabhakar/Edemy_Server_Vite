import { IUser } from "../../../../entities/user";
import userModel from "../../models/userModel";

export const getUser = async (id: string): Promise<IUser> => {
  try {
    return (await userModel.findOne({
      _id: id,
      role: { $eq: "user" },
    })) as IUser;
  } catch (error) {
    throw error;
  }
};
