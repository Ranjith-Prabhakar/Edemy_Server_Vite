import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { ICloudStorage } from "../../interface/services/cloudStorage";
export declare const addFileToCloud: (cloudStorage: ICloudStorage, courseRepository: ICourseRepository, req: Req, next: Next) => Promise<string | void>;
