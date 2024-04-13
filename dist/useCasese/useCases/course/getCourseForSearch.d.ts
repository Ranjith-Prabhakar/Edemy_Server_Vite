import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { ICourseCategoryBaseResponse } from "../../interface/request_And_Response/course";
export declare const getCourseForSearch: (courseRepository: ICourseRepository, req: Req, next: Next) => Promise<void | ICourseCategoryBaseResponse>;
