import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/userRepository";
import ErrorHandler from "../../middlewares/errorHandler";

export const getInstructors = async (userRepository: IUserRepository, next: Next) => {
  try {
    console.log("inside getInstructors uuc-module");
    return await userRepository.getUsers("instructor");
  } catch (error: any) {
    return next(new ErrorHandler(500, error.message));
  }
};
