import ErrorResponse from "../../handler/errorResponse";
import { Response } from "../../interface/services/response";
import {IHashpassword} from "../../interface/services/hashPassword";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IRequestValidator } from "../../interface/repository/validateRepository";

export const createUser = async (
  userRepository: IUserRepository,
  name:string,
  email: string,
  password: string
): Promise<Response> => {
  console.log("insede userUsecase 00000")
  try {
      const createNewUser = await userRepository.createUser({name,email,password});
      console.log(createNewUser,"^^^^^^^")
      return {
        status: 200,
        success: true,
        message: "Successfully created",
      };
    }
  catch (err) {
    throw err;
  }
};
