import { IModuleVideoBody } from "../request/course";
import { ICourseResponse } from "../response/courseResponse";

export interface ICourseRepository {
  getCourseInProgress(instructor: string): Promise<ICourseResponse>;
  addCourseData(courseData: ICourseRepository): Promise<ICourseResponse>;
  updateCourse(
    instructor: string,
    datum: { [key: string]: string }
  ): Promise<ICourseResponse>;
  addModuleVideos(
    data: IModuleVideoBody,
    instructor: string
  ): Promise<ICourseResponse>;
  findByName(courseName: string): Promise<string | void>
}
