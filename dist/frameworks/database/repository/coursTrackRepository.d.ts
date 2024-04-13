import { ICourseTrackingRepository } from "../../../useCasese/interface/repository/courseTrackingRepository";
import { ICourseTrackRequest, ICourseTrackResponse } from "../../../useCasese/interface/request_And_Response/courseTrack";
export declare class CourseTrackRepository implements ICourseTrackingRepository {
    setVideoTracking(videoData: ICourseTrackRequest): Promise<void | ICourseTrackResponse>;
    getVideoTracking(courseId: string, userId: string, moduleNo: string, videoNo: string): Promise<void | {
        position: string;
    }>;
}
