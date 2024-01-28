import {Req,Res,Next} from "../../frameworks/types/serverPackageTypes"
import { IUserRepository } from "../interface/repository/userRepository";
import { IHashpassword } from "../interface/services/hashPassword";
import { ICreateOtp } from "../interface/services/createOtp";
import { ISendMail } from "../interface/services/sendMail";
import { IOtpRepository } from "../interface/repository/otpRepository";
import { ICloudSession } from "../interface/services/cloudSession";
import { IRequestManagement } from "../interface/services/requestManagement";
import { IJwt } from "../interface/services/jwt.types";
import { verifyUser, registerUser, login, logout, refresh } from "./user/index";

export class UserUsecase {
  private readonly userRepository: IUserRepository;
  private readonly bcrypt: IHashpassword;
  private readonly otpGenerator: ICreateOtp;
  private readonly sendMail: ISendMail;
  private readonly otpRepository: IOtpRepository;
  private readonly jwtToken: IJwt;
  private readonly cloudSession: ICloudSession;
  private readonly requestManagement: IRequestManagement;

  constructor(
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    otpGenerator: ICreateOtp,
    sendMail: ISendMail,
    otpRepository: IOtpRepository,
    jwtToken: IJwt,
    cloudSession: ICloudSession,
    requestManagement: IRequestManagement
  ) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.otpGenerator = otpGenerator;
    this.sendMail = sendMail;
    this.otpRepository = otpRepository;
    this.jwtToken = jwtToken;
    this.cloudSession = cloudSession;
    this.requestManagement = requestManagement;
  }
  // **************************************************************************************
  async registerUser({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    let result = await registerUser(
      this.otpRepository,
      this.userRepository,
      this.sendMail,
      this.otpGenerator,
      this.jwtToken,
      this.bcrypt,
      email,
      name,
      password
    );
    return result;
  }
  // **************************************************************************************
  async verifyUser(verificationCode: string, token: string) {
    const verification = await verifyUser(
      this.userRepository,
      this.otpRepository,
      this.jwtToken,
      verificationCode,
      token
    );
    return verification;
  }
  // **************************************************************************************
  async login({ email, password }: { email: string; password: string }) {
    return await login(
      this.userRepository,
      this.bcrypt,
      this.jwtToken,
      this.cloudSession,
      email,
      password
    );
  }
  // **************************************************************************************
  async logout(req: Req, res: Res, next: Next) {
    const result = await logout(
      this.cloudSession,
      this.requestManagement,
      req,
      res,
      next
    );
    return result;
  }
  // **************************************************************************************
  async refresh(req: Req, res: Res, next: Next) {
    return await refresh(this.cloudSession, this.jwtToken, req, next);
  }
}
