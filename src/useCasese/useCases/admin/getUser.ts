import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../middlewares/errorHandler";
import { IUserRepository } from "../../interface/repository/userRepository";

export const getUser = async (
  userRepository: IUserRepository,
  req: Req,
  next: Next
) => {
  try {
    const id = req.params.id;
    return await userRepository.getUser(id);
  } catch (error: any) {
    return next(new ErrorHandler(500, error.message));
  }
};
