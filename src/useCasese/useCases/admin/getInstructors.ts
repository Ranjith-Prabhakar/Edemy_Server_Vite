import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/userRepository";
import { catchError } from "../../middlewares/catchError";

export const getInstructors = async (
  userRepository: IUserRepository,
  next: Next
) => {
  try {
    return await userRepository.getUsers("instructor");
  } catch (error) {
    catchError(error, next);
    // return next(new ErrorHandler(500, error.message));
  }
};
