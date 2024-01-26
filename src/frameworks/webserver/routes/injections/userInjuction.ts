import userModel from "../../../database/mongoDb/models/userModel"
import {UserRepository} from "../../../database/mongoDb/repository/userRepository"
import {UserUsecase} from "../../../../useCasese/useCases/userUseCase"
import {UserController} from '../../../../controllers/userController'
import {Encrypt} from '../../../services/hashPassword'
import { GenerateOtp } from "../../../services/generateOtp"
import { SendMail } from "../../../services/sendMail"
import { OtpRepository } from "../../../database/mongoDb/repository/otp.repository"




const userRepository = new UserRepository(userModel)
const bcryptService = new Encrypt()
const generateOTP = new GenerateOtp()
const sendMail = new SendMail()
const  otpRepository = new OtpRepository()
const userUseCase = new UserUsecase(userRepository,bcryptService,generateOTP,sendMail,otpRepository)
const userController = new UserController(userUseCase,userRepository)

export {userController}