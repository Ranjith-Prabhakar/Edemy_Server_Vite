import { ICourseResponse } from "../response/courseResponse";

export interface ICourseRepository {
  getCourseInProgress(): Promise<ICourseResponse>;
}