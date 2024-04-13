import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { ICourseResponse } from "../../interface/request_And_Response/course";
export declare const approveOrRejectVideo: (courseRepository: ICourseRepository, req: Req, next: Next) => Promise<void | ICourseResponse>;
