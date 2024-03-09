import { Next, Req } from "../../frameworks/types/serverPackageTypes";
import { ICourseResponse } from "../interface/request_And_Response/course";
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
} from "./course/index";
import { ICourseRepository } from "../interface/repository/courseRepository";
import { ICloudStorageResponse } from "../interface/request_And_Response/cloudStorageResponse";
import { NextFunction } from "express";
import { ICategoryResponse } from "../interface/request_And_Response/category";
import { ICategoryRepository } from "../interface/repository/categoryRepository";
import { ICategory } from "../../entities/category";
import { catchError } from "../middlewares/catchError";
import { IUserRepository } from "../interface/repository/userRepository";

export class CourseUseCase implements ICourseUseCase {
  private readonly cloudStorage: ICloudStorage;
  private readonly courseRepository: ICourseRepository;
  private readonly categoryRepository: ICategoryRepository;
  constructor(
    cloudStorage: ICloudStorage,
    courseRepository: ICourseRepository,
    categoryRepository: ICategoryRepository
  ) {
    this.cloudStorage = cloudStorage;
    this.courseRepository = courseRepository;
    this.categoryRepository = categoryRepository;
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
}
