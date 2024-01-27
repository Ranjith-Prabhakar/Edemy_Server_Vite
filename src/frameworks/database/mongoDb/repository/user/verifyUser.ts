import { IUser } from "../../../../../entities/user";
import userModel from "../../models/userModel";

export const verifyUser = async(
  newUser:IUser,
  userModels: typeof userModel
): Promise<{ user?:IUser;success: boolean; message: string;status:number }> =>{

  try {
    const user = await userModels.create(newUser)
    await user.save()
    return {user,success:true,message:"user created successfully",status:200}
  } catch (error:any) {
    return {success:false,message:`${error.message}`,status:500}
  }
}