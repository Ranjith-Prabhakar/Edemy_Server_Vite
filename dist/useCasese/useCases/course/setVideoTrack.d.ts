import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseTrackingRepository } from "../../interface/repository/courseTrackingRepository";
import { ICourseTrackResponse } from "../../interface/request_And_Response/courseTrack";
export declare const setVideoTrack: (courseTrackingRepository: ICourseTrackingRepository, req: Req, next: Next) => Promise<void | ICourseTrackResponse>;
