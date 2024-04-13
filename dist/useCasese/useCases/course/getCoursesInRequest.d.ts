import { Next } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { ICourseResponse } from "../../interface/request_And_Response/course";
export declare const getCoursesInRequest: (courseRepository: ICourseRepository, next: Next) => Promise<void | ICourseResponse>;
