import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { ICourseTrackingRepository } from "../../interface/repository/courseTrackingRepository";
import { IExtendedCloudStorageResponse } from "../../interface/request_And_Response/cloudStorageResponse";
import { ICloudStorage } from "../../interface/services/cloudStorage";
export declare const getVideoForUser: (courseRepository: ICourseRepository, cloudStorage: ICloudStorage, courseTrackingRepository: ICourseTrackingRepository, req: Req, next: Next) => Promise<IExtendedCloudStorageResponse | void>;
