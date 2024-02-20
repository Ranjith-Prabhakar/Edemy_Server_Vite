import { Next, Req } from "../../frameworks/types/serverPackageTypes";
import { ICourseResponse } from "../interface/request_And_Response/course";
import { ICloudStorage } from "../interface/services/cloudStorage";
import { ICourseUseCase } from "../interface/useCase/courseUseCase";
import ErrorHandler from "../middlewares/errorHandler";

import {
  getCourseInProgress,
  addCourseData,
  addModule,
  updateCourse,
  addModuleVideos,
  getCourses,
  getCoursesInRequest,
  getVideoPresignedUrl,
  approveOrRejectVideo,
} from "./course/index";
import { ICourseRepository } from "../interface/repository/courseRepository";
import { ICloudStorageResponse } from "../interface/request_And_Response/cloudStorageResponse";

export class CourseUseCase implements ICourseUseCase {
  private readonly cloudStorage: ICloudStorage;
  private readonly courseRepository: ICourseRepository;
  constructor(
    cloudStorage: ICloudStorage,
    courseRepository: ICourseRepository
  ) {
    this.cloudStorage = cloudStorage;
    this.courseRepository = courseRepository;
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
  async addModule(req: Req, next: Next): Promise<string | void> {
    try {
      return await addModule(
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
  async getCourses(
    req: Req,
    next: Next
  ): Promise<void | ICourseResponse> {
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
return await approveOrRejectVideo(this.courseRepository,req,next)
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
}
