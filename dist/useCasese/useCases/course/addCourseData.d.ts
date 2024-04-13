import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { ICourseResponse } from "../../interface/request_And_Response/course";
import { ICloudSession } from "../../interface/services/cloudSession";
export declare const addCourseData: (courseRepository: ICourseRepository, userRepository: IUserRepository, cloudSesssion: ICloudSession, req: Req, next: Next) => Promise<ICourseResponse | void>;
