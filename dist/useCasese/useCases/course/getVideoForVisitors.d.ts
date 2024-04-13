import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { ICloudStorageResponse } from "../../interface/request_And_Response/cloudStorageResponse";
import { ICloudStorage } from "../../interface/services/cloudStorage";
export declare const getVideoForVisitors: (courseRepository: ICourseRepository, cloudStorage: ICloudStorage, req: Req, next: Next) => Promise<ICloudStorageResponse | void>;
