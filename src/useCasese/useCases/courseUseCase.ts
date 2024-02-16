import { NextFunction } from "express";
import { Next, Req } from "../../frameworks/types/serverPackageTypes";
import { ICourseResponse } from "../interface/response/courseResponse";
import { ICloudStorage } from "../interface/services/cloudStorage";
import { ICourseUseCase } from "../interface/useCase/courseUseCase";
import ErrorHandler from "../middlewares/errorHandler";

import {
  getCourseInProgress,
  addCourseData,
  addModule,
  updateCourse,
  addModuleVideos,
} from "./course/index";
import { ICourseRepository } from "../interface/repository/courseRepository";

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
    next: NextFunction
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
      return await addModule(this.cloudStorage, req, next);
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
}
