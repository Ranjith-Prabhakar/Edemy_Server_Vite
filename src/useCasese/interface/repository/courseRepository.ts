import { ICourse } from "../../../entities/course";
import { ICourseResponse } from "../response/courseResponse";

export interface ICourseRepository {
  [x: string]: any;
  getCourseInProgress(instructor: string): Promise<ICourseResponse>;
  addCourseData(courseData: ICourseRepository): Promise<ICourseResponse>;
  updateCourse(instructor: string,datum: {[key:string]:string}):Promise<ICourseResponse>;
}