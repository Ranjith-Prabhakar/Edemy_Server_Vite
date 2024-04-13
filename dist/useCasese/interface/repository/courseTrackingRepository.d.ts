import { ICourseTrackRequest, ICourseTrackResponse } from "../request_And_Response/courseTrack";
export interface ICourseTrackingRepository {
    setVideoTracking(videoData: ICourseTrackRequest): Promise<ICourseTrackResponse | void>;
    getVideoTracking(courseId: string, userId: string, moduleNo: string, videoNo: string): Promise<{
        position: string;
    } | void>;
}
