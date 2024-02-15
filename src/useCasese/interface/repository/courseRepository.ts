import { ICourseResponse } from "../response/courseResponse";

export interface ICourseRepository {
  getCourseInProgress(instructor:string): Promise<ICourseResponse>;
}