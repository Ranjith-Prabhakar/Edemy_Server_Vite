import { Req, Res, Next } from "../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../interface/repository/userRepository";
import { IHashpassword } from "../interface/services/hashPassword";
import { ICreateOtp } from "../interface/services/createOtp";
import { ISendMail } from "../interface/services/sendMail";
import { IOtpRepository } from "../interface/repository/otpRepository";
import { ICloudSession } from "../interface/services/cloudSession";
import { IRequestManagement } from "../interface/services/requestManagement";
import { IJwt, IToken } from "../interface/services/jwt.types";
//
import { SocketClass } from "../staticClassProperty/StaticClassProperty";

import {
  createUser,
  registerUser,
  login,
  logout,
  refresh,
  beInstructor,
  forgotPassword,
  resetForgotPassword,
  userSession,
  forgotPasswordOtpVerification,
  getNotifications,
  updateNotifications,
} from "./user/index";
import { IInstructorAgreementRepository } from "../interface/repository/instructorAgreementRepository";
import { IUserUseCase } from "../interface/useCase/userUseCase";
import { IUser } from "../../entities/user";
import { IJsonResponse } from "../interface/services/jsonResponse";
import { IGeneralResponse } from "../interface/request_And_Response/generalResponse";
import { catchError } from "../middlewares/catchError";
import { INotificationRepository } from "../interface/repository/notificationRepository";
import { NextFunction } from "express";
import { INotificationResponse } from "../interface/request_And_Response/notification";

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
  private readonly notificationRepository: INotificationRepository;

  //
  constructor(
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    otpGenerator: ICreateOtp,
    sendMail: ISendMail,
    otpRepository: IOtpRepository,
    jwtToken: IJwt,
    cloudSession: ICloudSession,
    requestManagement: IRequestManagement,
    instructorAgreementRepository: IInstructorAgreementRepository,
    notificationRepository: INotificationRepository
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
    this.notificationRepository = notificationRepository;
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
    } catch (error: unknown) {
      catchError(error, next);
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
    } catch (error: unknown) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async login(
    { email, password }: { email: string; password: string },
    next: Next
  ): Promise<{ user: IUser; tokens: IToken } | void> {
    try {
      return await login(
        this.userRepository,
        this.bcrypt,
        this.jwtToken,
        this.cloudSession,
        email,
        password,
        next
      );
    } catch (error: unknown) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async logout(req: Req, res: Res, next: Next): Promise<void> {
    try {
      SocketClass.SocketUsers[req.user?._id as string].emit(
        "serverSideLogout",
        "user logged out successfully"
      );
      return await logout(
        this.cloudSession,
        this.requestManagement,
        req,
        res,
        next
      );
    } catch (error: unknown) {
      catchError(error, next);
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
    } catch (error: unknown) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async beInstructor(req: Req, next: Next): Promise<IJsonResponse | void> {
    try {
      return await beInstructor(
        this.instructorAgreementRepository,
        this.userRepository,
        this.notificationRepository,
        req,
        next
      );
    } catch (error: unknown) {
      catchError(error, next);
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
    } catch (error: unknown) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async forgotPasswordOtpVerification(
    req: Req,
    next: Next,
    token: string
  ): Promise<IGeneralResponse | void> {
    try {
      return await forgotPasswordOtpVerification(
        this.otpRepository,
        this.jwtToken,
        req,
        next,
        token
      );
    } catch (error: unknown) {
      catchError(error, next);
    }
  }
  // **************************************************************************************

  async resetForgotPassword(
    req: Req,
    token: string,
    next: Next
  ): Promise<IGeneralResponse | void> {
    try {
      return await resetForgotPassword(
        this.userRepository,
        this.otpRepository,
        this.jwtToken,
        this.bcrypt,
        req,
        token,
        next
      );
    } catch (error: unknown) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async userSession(req: Req, next: Next): Promise<IUser | void> {
    try {
      return await userSession(req, next);
    } catch (error: unknown) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async getNotifications(
    req: Req,
    next: NextFunction
  ): Promise<void | INotificationResponse> {
    try {
      return await getNotifications(this.notificationRepository, req, next);
    } catch (error) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async updateNotifications(
    req: Req,
    next: NextFunction
  ): Promise<void | { success: boolean; message: string }> {
    try {
      return await updateNotifications(this.notificationRepository,req,next);
    } catch (error) {
      catchError(error, next);
    }
  }
}

// import { Req, Res, Next } from "../../frameworks/types/serverPackageTypes";
// import { IUserRepository } from "../interface/repository/userRepository";
// import { IHashpassword } from "../interface/services/hashPassword";
// import { ICreateOtp } from "../interface/services/createOtp";
// import { ISendMail } from "../interface/services/sendMail";
// import { IOtpRepository } from "../interface/repository/otpRepository";
// import { ICloudSession } from "../interface/services/cloudSession";
// import { IRequestManagement } from "../interface/services/requestManagement";
// import { IJwt, IToken } from "../interface/services/jwt.types";
// import { TSocket } from "../../frameworks/types/socketTypes";

// import {
//   createUser,
//   registerUser,
//   login,
//   logout,
//   refresh,
//   beInstructor,
//   forgotPassword,
//   resetForgotPassword,
//   userSession,
//   forgotPasswordOtpVerification,
// } from "./user/index";
// import { IInstructorAgreementRepository } from "../interface/repository/instructorAgreementRepository";
// import { IUserUseCase } from "../interface/useCase/userUseCase";
// import { IUser } from "../../entities/user";
// import { IJsonResponse } from "../interface/services/jsonResponse";
// import { IGeneralResponse } from "../interface/request_And_Response/generalResponse";
// import { catchError } from "../middlewares/catchError";

// export class UserUsecase implements IUserUseCase {
//   private readonly userRepository: IUserRepository;
//   private readonly bcrypt: IHashpassword;
//   private readonly otpGenerator: ICreateOtp;
//   private readonly sendMail: ISendMail;
//   private readonly otpRepository: IOtpRepository;
//   private readonly jwtToken: IJwt;
//   private readonly cloudSession: ICloudSession;
//   private readonly requestManagement: IRequestManagement;
//   private readonly instructorAgreementRepository: IInstructorAgreementRepository;
//   private readonly socket: TSocket;
//   constructor(
//     userRepository: IUserRepository,
//     bcrypt: IHashpassword,
//     otpGenerator: ICreateOtp,
//     sendMail: ISendMail,
//     otpRepository: IOtpRepository,
//     jwtToken: IJwt,
//     cloudSession: ICloudSession,
//     requestManagement: IRequestManagement,
//     instructorAgreementRepository: IInstructorAgreementRepository,
//     socket: TSocket
//   ) {
//     this.userRepository = userRepository;
//     this.bcrypt = bcrypt;
//     this.otpGenerator = otpGenerator;
//     this.sendMail = sendMail;
//     this.otpRepository = otpRepository;
//     this.jwtToken = jwtToken;
//     this.cloudSession = cloudSession;
//     this.requestManagement = requestManagement;
//     this.instructorAgreementRepository = instructorAgreementRepository;
//     this.socket = socket;
//   }
//   // **************************************************************************************
//   async registerUser(
//     {
//       name,
//       email,
//       password,
//     }: {
//       name: string;
//       email: string;
//       password: string;
//     },
//     next: Next
//   ): Promise<string | void> {
//     try {
//       let result = await registerUser(
//         this.otpRepository,
//         this.userRepository,
//         this.sendMail,
//         this.otpGenerator,
//         this.jwtToken,
//         this.bcrypt,
//         email,
//         name,
//         password,
//         next
//       );
//       return result;
//     } catch (error: unknown) {
//       catchError(error, next);
//     }
//   }
//   // **************************************************************************************
//   async createUser(
//     verificationCode: string,
//     token: string,
//     next: Next
//   ): Promise<IUser | void> {
//     try {
//       return await createUser(
//         this.userRepository,
//         this.otpRepository,
//         this.jwtToken,
//         verificationCode,
//         token,
//         next
//       );
//     } catch (error: unknown) {
//       catchError(error, next);
//     }
//   }
//   // **************************************************************************************
//   async login(
//     { email, password }: { email: string; password: string },
//     next: Next
//   ): Promise<{ user: IUser; tokens: IToken } | void> {
//     try {
//       return await login(
//         this.userRepository,
//         this.bcrypt,
//         this.jwtToken,
//         this.cloudSession,
//         email,
//         password,
//         next
//       );
//     } catch (error: unknown) {
//       catchError(error, next);
//     }
//   }
//   // **************************************************************************************
//   async logout(req: Req, res: Res, next: Next): Promise<void> {
//     try {
//       return await logout(
//         this.cloudSession,
//         this.requestManagement,
//         req,
//         res,
//         next
//       );
//     } catch (error: unknown) {
//       catchError(error, next);
//     }
//   }
//   // **************************************************************************************
//   async refresh(req: Req, res: Res, next: Next): Promise<IToken | void> {
//     try {
//       return (await refresh(
//         this.cloudSession,
//         this.jwtToken,
//         req,
//         next
//       )) as IToken;
//     } catch (error: unknown) {
//       catchError(error, next);
//     }
//   }
//   // **************************************************************************************
//   async beInstructor(req: Req, next: Next): Promise<IJsonResponse | void> {
//     try {
//       return await beInstructor(this.instructorAgreementRepository, req, next);
//     } catch (error: unknown) {
//       catchError(error, next);
//     }
//   }
//   // **************************************************************************************
//   async forgotPassword(req: Req, next: Next): Promise<string | void> {
//     try {
//       return await forgotPassword(
//         this.otpRepository,
//         this.userRepository,
//         this.sendMail,
//         this.otpGenerator,
//         this.jwtToken,
//         req,
//         next
//       );
//     } catch (error: unknown) {
//       catchError(error, next);
//     }
//   }
//   // **************************************************************************************
//   async forgotPasswordOtpVerification(
//     req: Req,
//     next: Next,
//     token: string
//   ): Promise<IGeneralResponse | void> {
//     try {
//       return await forgotPasswordOtpVerification(
//         this.otpRepository,
//         this.jwtToken,
//         req,
//         next,
//         token
//       );
//     } catch (error: unknown) {
//       catchError(error, next);
//     }
//   }
//   // **************************************************************************************

//   async resetForgotPassword(
//     req: Req,
//     token: string,
//     next: Next
//   ): Promise<IGeneralResponse | void> {
//     try {
//       return await resetForgotPassword(
//         this.userRepository,
//         this.otpRepository,
//         this.jwtToken,
//         this.bcrypt,
//         req,
//         token,
//         next
//       );
//     } catch (error: unknown) {
//       catchError(error, next);
//     }
//   }
//   // **************************************************************************************
//   async userSession(req: Req, next: Next): Promise<IUser | void> {
//     try {
//       return await userSession(req, next);
//     } catch (error: unknown) {
//       catchError(error, next);
//     }
//   }
// }
