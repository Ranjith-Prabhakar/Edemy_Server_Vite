import { ICourseRepository } from "../../../../useCasese/interface/repository/courseRepository";
import { ICourseResponse } from "../../../../useCasese/interface/response/courseResponse";

import {getCourseInProgress} from './courseRepository/index';

export class CourseRepository implements ICourseRepository {
  async getCourseInProgress(instructor:string): Promise<ICourseResponse> {
    try {
      return await getCourseInProgress(instructor);
    } catch (error: any) {
      throw error;
    }
  }
}