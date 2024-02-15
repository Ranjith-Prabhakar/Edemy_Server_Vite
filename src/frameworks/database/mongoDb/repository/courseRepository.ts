import { ICourseRepository } from "../../../../useCasese/interface/repository/courseRepository";
import { ICourseResponse } from "../../../../useCasese/interface/response/courseResponse";

import {
  getCourseInProgress,
  addCourseData,
  updateCourse,
} from "./courseRepository/index";

export class CourseRepository implements ICourseRepository {
  async getCourseInProgress(instructor: string): Promise<ICourseResponse> {
    try {
      return await getCourseInProgress(instructor);
    } catch (error: any) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async addCourseData(courseData: ICourseRepository): Promise<ICourseResponse> {
    try {
      return await addCourseData(courseData);
    } catch (error: any) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

  async updateCourse(
    instructor: string,
    datum: { [key: string]: string }
  ): Promise<ICourseResponse> {
    try {
      return await updateCourse(instructor, datum);
    } catch (error: any) {
      throw error;
    }
  }
}
