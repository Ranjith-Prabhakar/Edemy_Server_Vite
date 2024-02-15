import { ICourse } from "../../../entities/course";

export interface ICourseResponse {
  status: number;
  message: string;
  data?: ICourse | ICourse[];
}