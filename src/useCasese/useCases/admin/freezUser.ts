import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IUserResponse } from "../../interface/request_And_Response/user";
import ErrorHandler from "../../middlewares/errorHandler";

export const freezUser = async (
  userRepository: IUserRepository,
  req: Req,
  next: Next
): Promise<IUserResponse | void> => {
  try {
    return await userRepository.freezUser(req.params.id as string);
  } catch (error: any) {
    return next(new ErrorHandler(500, error.message));
  }
};
