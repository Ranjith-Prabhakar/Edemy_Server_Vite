import userModel from "../../../database/mongoDb/models/userModel"
import {UserRepository} from "../../../database/mongoDb/repository/userRepository"
import {UserUsecase} from "../../../../useCasese/useCases/userUseCase"
import {UserController} from '../../../../controllers/userController'




const userRepository = new UserRepository(userModel)
const userUseCase = new UserUsecase(userRepository)
const userController = new UserController(userUseCase,userRepository)

export {userController}