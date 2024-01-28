import userModel from "../../../database/mongoDb/models/userModel";
import { UserRepository } from "../../../database/mongoDb/repository/userRepository";
import { OtpRepository } from "../../../database/mongoDb/repository/otp.repository";
import { InstrctorAgreementRepository } from "../../../database/mongoDb/repository/instructorAgreementRepository";
import { UserUsecase } from "../../../../useCasese/useCases/userUseCase";
import { Encrypt } from "../../../services/hashPassword";
import { GenerateOtp } from "../../../services/generateOtp";
import { SendMail } from "../../../services/sendMail";

import { JWTtoken } from "../../../services/jwt";
import { CloudSession } from "../../../services/cloudSession";
import { RequestManagement } from "../../../services/requestManagement";
import { UserController } from "../../../../controllers/userController";
import { AdminUseCase } from "../../../../useCasese/useCases/adminUseCase";
import { AdminController } from "../../../../controllers/adminController";

const userRepository = new UserRepository(userModel);
const bcryptService = new Encrypt();
const generateOTP = new GenerateOtp();
const sendMail = new SendMail();
const otpRepository = new OtpRepository();
const jwtToken = new JWTtoken();
const cloudSession = new CloudSession();
const requestManagement = new RequestManagement();
const instrctorAgreementRepository = new InstrctorAgreementRepository();

const userUseCase = new UserUsecase(
  userRepository,
  bcryptService,
  generateOTP,
  sendMail,
  otpRepository,
  jwtToken,
  cloudSession,
  requestManagement,
  instrctorAgreementRepository
);

const adminUseCase = new AdminUseCase(userRepository);

const userController = new UserController(userUseCase);
const adminController = new AdminController(adminUseCase);
export { userController, adminController };
