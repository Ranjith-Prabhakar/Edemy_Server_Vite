import userModel from "../../../models/userModel";

export const fidUserByEmail = async (
  email: string,
  userModels: typeof userModel
) => {
  const existingUser = await userModels.findOne({ email });
  return existingUser;
};
