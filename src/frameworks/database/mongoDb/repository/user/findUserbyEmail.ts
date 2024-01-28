import userModel from "../../models/userModel"

export const fidUserByEmail = async(email:string,userModels:typeof userModel)=>{
 const existingUser = await userModels.findOne({email})
 console.log("inside finduserbyemail=>frame",existingUser);
    if(existingUser){
      return { userExist: true };
    }else{
      return { userExist: false };
    }

}