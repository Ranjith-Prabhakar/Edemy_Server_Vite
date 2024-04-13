import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { ICourseResponse } from "../../interface/request_And_Response/course";
export declare const updateCourse: (courseRepository: ICourseRepository, userRepository: IUserRepository, req: Req, next: Next) => Promise<ICourseResponse | void>;
