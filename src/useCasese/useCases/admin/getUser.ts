import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IUser } from "../../../entities/user";
import { catchError } from "../../middlewares/catchError";

export const getUser = async (
  userRepository: IUserRepository,
  req: Req,
  next: Next
): Promise<IUser | void> => {
  try {
    const id = req.params.id;
    return await userRepository.getUser(id);
  } catch (error) {
    catchError(error,next)
    // return next(new ErrorHandler(500, error.message));
  }
};
