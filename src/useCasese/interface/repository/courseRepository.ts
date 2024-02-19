import { ICourse } from "../../../entities/course";
import { IModuleVideoBody } from "../request/course";
import { ICourseResponse } from "../request_And_Response/course";

export interface ICourseRepository {
  getCourseInProgress(instructor: string): Promise<ICourseResponse>;
  addCourseData(courseData: ICourse): Promise<ICourseResponse>;
  updateCourse(
    instructor: string,
    datum: { [key: string]: string }
  ): Promise<ICourseResponse>;
  addModuleVideos(
    data: IModuleVideoBody,
    instructor: string
  ): Promise<ICourseResponse>;
  findByName(courseName: string): Promise<string | void>;
}
