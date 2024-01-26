import ErrorResponse from "../../handler/errorResponse";
import { Response } from "../../interface/services/response";
import {IHashpassword} from "../../interface/services/hashPassword";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IRequestValidator } from "../../interface/repository/validateRepository";

export const createUser = async (
  userRepository: IUserRepository,
  bcrypt:IHashpassword,
  name:string,
  email: string,
  password: string
): Promise<Response> => {
  try {
      const userExist = await userRepository.fidUserByEmail(email)
      if(userExist.userExist){
        return {status:400,success:false,message:"user with this mail id already exists",}
      }else{
        password  = await bcrypt.createHash(password)
        const createNewUser = await userRepository.createUser({name,email,password});
        console.log()
        return createNewUser
      }
    }
  catch (err) {
    throw err;
  }
};
