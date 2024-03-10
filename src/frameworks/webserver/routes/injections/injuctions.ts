import userModel from "../../../database/mongoDb/models/userModel";
import { UserRepository } from "../../../database/mongoDb/repository/userRepository";
import { OtpRepository } from "../../../database/mongoDb/repository/otp.repository";
import { CategoryRepository } from "../../../database/mongoDb/repository/categoryRepository";
import { InstrctorAgreementRepository } from "../../../database/mongoDb/repository/instructorAgreementRepository";
import { CourseRepository } from "../../../database/mongoDb/repository/courseRepository";

import { UserUsecase } from "../../../../useCasese/useCases/userUseCase";
import { AdminUseCase } from "../../../../useCasese/useCases/adminUseCase";
import { CourseUseCase } from "../../../../useCasese/useCases/courseUseCase";

import { UserController } from "../../../../controllers/userController";
import { AdminController } from "../../../../controllers/adminController";
import { CoursesController } from "../../../../controllers/coursesController";

import { Encrypt } from "../../../services/hashPassword";
import { GenerateOtp } from "../../../services/generateOtp";
import { SendMail } from "../../../services/sendMail";
import { JWTtoken } from "../../../services/jwt";
import { CloudSession } from "../../../services/cloudSession";
import { RequestManagement } from "../../../services/requestManagement";
import { CloudStorage } from "../../../services/cloudStorage";
import { PaymentService } from "../../../services/paymentService";
import { PaymentRepository } from "../../../database/mongoDb/repository/paymentRepository";

const userRepository = new UserRepository(userModel);
const bcryptService = new Encrypt();
const generateOTP = new GenerateOtp();
const sendMail = new SendMail();
const otpRepository = new OtpRepository();
const jwtToken = new JWTtoken();
const cloudSession = new CloudSession();
const requestManagement = new RequestManagement();
const instrctorAgreementRepository = new InstrctorAgreementRepository();
const categoryRepository = new CategoryRepository();
const cloudStorage = new CloudStorage();
const courseRepository = new CourseRepository();
const paymentService = new PaymentService();
const paymentRepository = new PaymentRepository();

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

const adminUseCase = new AdminUseCase(
  userRepository,
  instrctorAgreementRepository,
  categoryRepository
);

const courseUseCase = new CourseUseCase(
  cloudStorage,
  courseRepository,
  categoryRepository,
  paymentService,
  paymentRepository
);

const userController = new UserController(userUseCase);
const adminController = new AdminController(adminUseCase);
const courseController = new CoursesController(courseUseCase);

export { userController, adminController, courseController };
