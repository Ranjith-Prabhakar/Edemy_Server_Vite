import { IUserRepository } from '../interface/repository/userRepository'
import { IHashpassword } from '../interface/services/hashPassword';
import { ICreateOtp } from '../interface/services/createOtp';
import { ISendMail } from '../interface/services/sendMail';
import { createUser } from './user/index';
import { IOtpRepository } from '../interface/repository/otpRepository';

export class UserUsecase{

private readonly userRepository : IUserRepository
private readonly bcrypt : IHashpassword
private readonly otpGenerator :ICreateOtp 
private readonly sendMail:ISendMail
private readonly otpRepository:IOtpRepository

constructor(
  userRepository:IUserRepository,
  bcrypt:IHashpassword,
  otpGenerator :ICreateOtp, 
  sendMail:ISendMail,
  otpRepository:IOtpRepository
  ){
  this.userRepository = userRepository
  this.bcrypt = bcrypt
  this.otpGenerator = otpGenerator
  this.sendMail = sendMail
  this.otpRepository = otpRepository
}

async createUser({name,email,password}:{name:string,email:string,password:string}){
let NewUser = await createUser(this.userRepository,this.bcrypt,name,email,password)
if(NewUser.user){
  const Otp = await this.otpGenerator.generateOTP()
  await this.otpRepository.createOtpUserCollection({userMail:NewUser.user.email,otp:Otp})
  await this.sendMail.sendEmailVerification(NewUser.user.name,NewUser.user.email,Otp)
  return NewUser
}
 return NewUser 
}

}

















// import {IUser} from '../../entities/user'
// import { IOtp } from "../../entities/otp";
// import { IUserRepository } from '../interface/repository/userRepository'
// import {IHashpassword} from '../interface/services/hashPassword'
// import { IOtpRepository} from '../interface/repository/otpRepository'
// import {Ijwt} from "../interface/services/jwt.types"

// import { createUser } from './user/index';

// export class UserUsecase{

// private readonly userRepository : IUserRepository
// private readonly otpRepository:IOtpRepository
// private readonly jwtToken:Ijwt
// private readonly encrypt : IHashpassword

// constructor(
  // userRepository:IUserRepository,
  // otpRepository:IOtpRepository,
  // jwtToken:Ijwt,
  // encrypt:IHashpassword
  // ){
  // this.userRepository = userRepository
  // this.encrypt = encrypt
  // this.otpRepository = otpRepository
  // this.jwtToken = jwtToken
// }


// async register(user:IUser,otp:number){
// try {
//   const newPassword = await this.encrypt.createHash(user.password)

//    const NewUser: IUser = {
//                 name: user.name,
//                 email: user.email,
//                 password: newPassword,
//             }

//   const response = await this.userRepository.createUser(NewUser)

//   if (!response.success) {
//     console.log("inside user usecase and !response.success",response)
//     return {
//         status: 500,
//         success: false,
//         message: response.message,
//     }
//   }

//    let otpDetails: IOtp = {
//                 userMail: user.email,
//                 otp,
//                 expiresAt: new Date(Date.now() + 15 * 60 * 1000),
//                 createdAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
//             }

//   const saveOtp = await this.otpRepository.SaveOtp(otpDetails)

//    if (saveOtp?.success) {

//                 const userId = response.user?._id?.toString() || '';
//                 const role = response.user?.role || ''
//                 const isApproved = response?.user?.isVerified || false

//                 const token = this.jwtToken.createJWT(userId, role, isApproved);
//                 console.log(token)
//                 return {
//                     status: 200,
//                     success: true,
//                     message: response.message + " & " + "otp Sent",
//                     token,
//                     user: response?.user,
//                     email: response.user?.email,
//                     id: response.user?._id
//                 }

//             }
// } catch (error) {
//   return {
//                 status: 500,
//                 success: false,
//                 message: "server error"

//             }
// }
// }
// }

// export default UserUsecase













