import { Next, Req } from "../../frameworks/types/serverPackageTypes";
import { ICourseCategoryBaseResponse, ICourseResponse } from "../interface/request_And_Response/course";
import { ICloudStorage } from "../interface/services/cloudStorage";
import { ICourseUseCase } from "../interface/useCase/courseUseCase";
import ErrorHandler from "../middlewares/errorHandler";

import {
  getCourseInProgress,
  addCourseData,
  addFileToCloud,
  updateCourse,
  addModuleVideos,
  getCourses,
  getCoursesInRequest,
  getVideoPresignedUrl,
  approveOrRejectVideo,
  getCoursesForUser,
  getCategories,
  getVideoForUser,
  getVideoForVisitors,
  enrollCourse,
  paymentStatus,
  updateReviewAndRating,
  getSingleCourseReviewAndRating,
  getThumbnamilImagePresignedUrl,
  getUserEnrolledCourses,
  getCourseByCategory,
} from "./course/index";
import { ICourseRepository } from "../interface/repository/courseRepository";
import { ICloudStorageResponse } from "../interface/request_And_Response/cloudStorageResponse";
import { NextFunction } from "express";
import { ICategoryRepository } from "../interface/repository/categoryRepository";
import { ICategory } from "../../entities/category";
import { catchError } from "../middlewares/catchError";
import { IPaymentRespose } from "../interface/request_And_Response/payment";
import { IPaymentService } from "../interface/services/paymentService";
import { IPaymentRepository } from "../interface/repository/paymentRepository";
import { IUserResponse } from "../interface/request_And_Response/user";
import { IUserRepository } from "../interface/repository/userRepository";
import { ICloudSession } from "../interface/services/cloudSession";
import { IReviewAndRatingResponse } from "../interface/request_And_Response/reviewAndRatingResponse";
import { IReviewAndRatingRepository } from "../interface/repository/reviewAndRatingRepository";

export class CourseUseCase implements ICourseUseCase {
  private readonly cloudStorage: ICloudStorage;
  private readonly courseRepository: ICourseRepository;
  private readonly categoryRepository: ICategoryRepository;
  private readonly paymentService: IPaymentService;
  private readonly paymentRepository: IPaymentRepository;
  private readonly userRepository: IUserRepository;
  private readonly cloudSesssion: ICloudSession;
  private readonly reviewAndRatingRepository: IReviewAndRatingRepository;
  constructor(
    cloudStorage: ICloudStorage,
    courseRepository: ICourseRepository,
    categoryRepository: ICategoryRepository,
    paymentService: IPaymentService,
    paymentRepository: IPaymentRepository,
    userRepository: IUserRepository,
    cloudSesssion: ICloudSession,
    reviewAndRatingRepository: IReviewAndRatingRepository
  ) {
    this.cloudStorage = cloudStorage;
    this.courseRepository = courseRepository;
    this.categoryRepository = categoryRepository;
    this.paymentService = paymentService;
    this.paymentRepository = paymentRepository;
    this.userRepository = userRepository;
    this.cloudSesssion = cloudSesssion;
    this.reviewAndRatingRepository = reviewAndRatingRepository;
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getCourseInProgress(
    req: Req,
    next: Next
  ): Promise<ICourseResponse | void> {
    try {
      return await getCourseInProgress(this.courseRepository, req, next);
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async addCourseData(req: Req, next: Next): Promise<ICourseResponse | void> {
    try {
      return await addCourseData(this.courseRepository, req, next);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async addFileToCloud(req: Req, next: Next): Promise<string | void> {
    try {
      return await addFileToCloud(
        this.cloudStorage,
        this.courseRepository,
        req,
        next
      );
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async updateCourse(req: Req, next: Next): Promise<ICourseResponse | void> {
    try {
      return await updateCourse(this.courseRepository, req, next);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async addModuleVideos(req: Req, next: Next): Promise<ICourseResponse | void> {
    try {
      return await addModuleVideos(this.courseRepository, req, next);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }

  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getCourses(req: Req, next: Next): Promise<void | ICourseResponse> {
    try {
      return await getCourses(this.courseRepository, next);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getCoursesInRequest(
    req: Req,
    next: Next
  ): Promise<void | ICourseResponse> {
    try {
      return await getCoursesInRequest(this.courseRepository, next);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getVideoPresignedUrl(
    req: Req,
    next: Next
  ): Promise<void | ICloudStorageResponse> {
    try {
      return await getVideoPresignedUrl(this.cloudStorage, req, next);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async approveOrRejectVideo(
    req: Req,
    next: Next
  ): Promise<void | ICourseResponse> {
    try {
      return await approveOrRejectVideo(this.courseRepository, req, next);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getCoursesForUser(
    req: Req,
    next: NextFunction
  ): Promise<void | ICourseResponse> {
    try {
      return await getCoursesForUser(this.courseRepository, req, next);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

  async getCategories(
    req: Req,
    next: NextFunction
  ): Promise<ICategory[] | void> {
    try {
      return await getCategories(this.categoryRepository, req, next);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }

  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getVideoForUser(
    req: Req,
    next: NextFunction
  ): Promise<ICloudStorageResponse | void> {
    try {
      console.log("getVideoForUser ===> useCase");

      return await getVideoForUser(
        this.courseRepository,
        this.cloudStorage,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

  async getVideoForVisitors(
    req: Req,
    next: NextFunction
  ): Promise<void | ICloudStorageResponse> {
    try {
      console.log("getVideoForVisitors ===> useCase");

      return await getVideoForVisitors(
        this.courseRepository,
        this.cloudStorage,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async enrollCourse(
    req: Req,
    next: NextFunction
  ): Promise<void | IPaymentRespose> {
    try {
      return await enrollCourse(
        this.paymentService,
        this.paymentRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async paymentStatus(
    req: Req,
    next: NextFunction
  ): Promise<void | IUserResponse> {
    try {
      return await paymentStatus(
        this.paymentRepository,
        this.userRepository,
        this.courseRepository,
        this.cloudSesssion,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async updateReviewAndRating(
    req: Req,
    next: NextFunction
  ): Promise<void | IReviewAndRatingResponse> {
    try {
      return await updateReviewAndRating(
        this.reviewAndRatingRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
  async getSingleCourseReviewAndRating(
    req: Req,
    next: Next
  ): Promise<void | IReviewAndRatingResponse> {
    try {
      return await getSingleCourseReviewAndRating(
        this.reviewAndRatingRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
  async getThumbnamilImagePresignedUrl(
    req: Req,
    next: NextFunction
  ): Promise<void | ICloudStorageResponse> {
    try {
      return await getThumbnamilImagePresignedUrl(this.cloudStorage, req, next);
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
  async getUserEnrolledCourses(
    req: Req,
    next: Next
  ): Promise<void | ICourseResponse> {
    try {
      return await getUserEnrolledCourses(this.courseRepository, req, next);
    } catch (error) {
      catchError(error, next);
    }
  }

  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
  async getCourseByCategory(
    req: Req,
    next: NextFunction
  ): Promise<void | ICourseCategoryBaseResponse> {
    try {
      return await getCourseByCategory(this.courseRepository, req, next);
    } catch (error) {
      catchError(error, next);
    }
  }
}

