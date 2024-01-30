import { Req, Res, Next } from "../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../interface/repository/userRepository";
import { IHashpassword } from "../interface/services/hashPassword";
import { ICreateOtp } from "../interface/services/createOtp";
import { ISendMail } from "../interface/services/sendMail";
import { IOtpRepository } from "../interface/repository/otpRepository";
import { ICloudSession } from "../interface/services/cloudSession";
import { IRequestManagement } from "../interface/services/requestManagement";
import { IJwt, IToken } from "../interface/services/jwt.types";
import {
  createUser,
  registerUser,
  login,
  logout,
  refresh,
  beInstructor,
  forgotPassword,
  resetForgotPassword,
} from "./user/index";
import { IInstructorAgreementRepository } from "../interface/repository/instructorAgreementRepository";
import { IUserUseCase } from "../interface/useCase/userUseCase";
import ErrorHandler from "../middlewares/errorHandler";
import { IUser } from "../../entities/user";
import { IJsonResponse } from "../interface/services/jsonResponse";

export class UserUsecase implements IUserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly bcrypt: IHashpassword;
  private readonly otpGenerator: ICreateOtp;
  private readonly sendMail: ISendMail;
  private readonly otpRepository: IOtpRepository;
  private readonly jwtToken: IJwt;
  private readonly cloudSession: ICloudSession;
  private readonly requestManagement: IRequestManagement;
  private readonly instructorAgreementRepository: IInstructorAgreementRepository;

  constructor(
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    otpGenerator: ICreateOtp,
    sendMail: ISendMail,
    otpRepository: IOtpRepository,
    jwtToken: IJwt,
    cloudSession: ICloudSession,
    requestManagement: IRequestManagement,
    instructorAgreementRepository: IInstructorAgreementRepository
  ) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.otpGenerator = otpGenerator;
    this.sendMail = sendMail;
    this.otpRepository = otpRepository;
    this.jwtToken = jwtToken;
    this.cloudSession = cloudSession;
    this.requestManagement = requestManagement;
    this.instructorAgreementRepository = instructorAgreementRepository;
  }
  // **************************************************************************************
  async registerUser(
    {
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    },
    next: Next
  ): Promise<string | void> {
    try {
      let result = await registerUser(
        this.otpRepository,
        this.userRepository,
        this.sendMail,
        this.otpGenerator,
        this.jwtToken,
        this.bcrypt,
        email,
        name,
        password,
        next
      );
      return result;
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // **************************************************************************************
  async createUser(
    verificationCode: string,
    token: string,
    next: Next
  ): Promise<IUser | void> {
    try {
      return await createUser(
        this.userRepository,
        this.otpRepository,
        this.jwtToken,
        verificationCode,
        token,
        next
      );
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // **************************************************************************************
  async login(
    { email, password }: { email: string; password: string },
    next: Next
  ): Promise<{ user: IUser; tokens: IToken } | void> {
    try {
      console.log("inside use case login");
      return await login(
        this.userRepository,
        this.bcrypt,
        this.jwtToken,
        this.cloudSession,
        email,
        password,
        next
      );
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // **************************************************************************************
  async logout(req: Req, res: Res, next: Next): Promise<void> {
    try {
      return await logout(
        this.cloudSession,
        this.requestManagement,
        req,
        res,
        next
      );
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // **************************************************************************************
  async refresh(req: Req, res: Res, next: Next): Promise<IToken | void> {
    try {
      return (await refresh(
        this.cloudSession,
        this.jwtToken,
        req,
        next
      )) as IToken;
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // **************************************************************************************
  async beInstructor(req: Req, next: Next): Promise<IJsonResponse | void> {
    try {
      return await beInstructor(this.instructorAgreementRepository, req, next);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // **************************************************************************************
  async forgotPassword(req: Req, next: Next): Promise<string | void> {
    try {
      return await forgotPassword(
        this.otpRepository,
        this.userRepository,
        this.sendMail,
        this.otpGenerator,
        this.jwtToken,
        req,
        next
      );
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // **************************************************************************************

  async resetForgotPassword(req: Req, token: string): Promise<IJsonResponse | void> {
    return await resetForgotPassword(
      this.userRepository,
      this.otpRepository,
      this.jwtToken,
      this.bcrypt,
      req,
      token
    );
  }
}
