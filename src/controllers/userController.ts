import { Req,Res,Next } from "../frameworks/types/serverPackageTypes"
import {UserUsecase} from "../useCasese/useCases/userUseCase"
import { IUserRepository } from "../useCasese/interface/repository/userRepository"

export class UserController{

  private userUseCase:UserUsecase 
  private userRepository:IUserRepository 

  constructor(userUseCase:UserUsecase,userRepository:IUserRepository){

  this.userUseCase = userUseCase
  this.userRepository = userRepository

  }

  // validate email
  validateEmail(email:string):boolean{
    let emailRegex:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }

  async createUser(req:Req,res:Res,next:Next){

    console.log("inside userController")
    
    try {
      let {name,email,password,confirmPassword} = req.body

      name = name ? name.trim() : null
      email = email ? email.trim() : null
      password = password ? password.trim() : null
      confirmPassword = confirmPassword ? confirmPassword.trim() : null

       if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({
          success:false,
          message:"missing required fields"
        })
      }

      if(name.length < 3) {
        return res.status(400).json({
          success:false,
          message: "name should have atleast 3 characters"
        })
      }

      if(!this.validateEmail(email)){
        return res.status(400).json({
          success:false,
          message: "invalid email format"
        })
      }

      if(password !== confirmPassword){
         return res.status(400).json({
          success:false,
          message: "password mismatches"
        })
      }
      const user = {...req.body}
      delete user.confirmPassword
      const newUser = await this.userUseCase.createUser(user)
      console.log("newUser--------------------->",newUser)

      // const existResponse = await this.userRepository.findByEmail(email)

      // if(existResponse){
      //   return res.status(400).json({
      //     success:false,
      //     message:"user already exist"
      //   })
      // }

      // const Otp = await this.generateOtp.generateOtp(4)

      // const sendOtp = await this.sendMail.sendMail(name,email, Otp)


      // if(!sendOtp.success){
      //   return res.json({
      //     sendOtp
      //   })
      // }


      //  const user:User = {
      //     name,
      //     email,
      //     password,
      // }

      // const response = await this.userUseCase.register(user,Otp)

      // if(!response?.success){
      //   return res.status(500).json(response)
      // }

      // console.log("response.token --> ",response.token)
      // res.cookie("access",(await response?.token)?.accessToken || "")
      //  res.status(response?.status).json(response)
       
    } catch (error:any) {
      //  console.error(error);
      //       res.status(500).json({
      //           success: false,
      //           message: "server error"
      //       })
    }
  }
}

