import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../middlewares/errorHandler";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IUser } from "../../../entities/user";

export const getUser = async (
  userRepository: IUserRepository,
  req: Req,
  next: Next
): Promise<IUser | void> => {
  try {
    const id = req.params.id;
    return await userRepository.getUser(id);
  } catch (error: any) {
    return next(new ErrorHandler(500, error.message));
  }
};
