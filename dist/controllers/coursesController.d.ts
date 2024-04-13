import { Next, Req, Res } from "../frameworks/types/serverPackageTypes";
import { ICourseUseCase } from "../useCasese/interface/useCase/courseUseCase";
export declare class CoursesController {
    private readonly courseUseCase;
    constructor(courseUseCase: ICourseUseCase);
    getCourseInProgress(req: Req, res: Res, next: Next): Promise<void>;
    addCourseData(req: Req, res: Res, next: Next): Promise<void>;
    addFileToCloud(req: Req, res: Res, next: Next): Promise<void>;
    updateCourse(req: Req, res: Res, next: Next): Promise<void>;
    addModuleVideos(req: Req, res: Res, next: Next): Promise<void>;
    getCourses(req: Req, res: Res, next: Next): Promise<void>;
    getCoursesInRequest(req: Req, res: Res, next: Next): Promise<void>;
    getVideoPresignedUrl(req: Req, res: Res, next: Next): Promise<void>;
    approveOrRejectVideo(req: Req, res: Res, next: Next): Promise<void>;
    getCoursesForUser(req: Req, res: Res, next: Next): Promise<void>;
    getCategories(req: Req, res: Res, next: Next): Promise<void>;
    getVideoForUser(req: Req, res: Res, next: Next): Promise<void>;
    getVideoForVisitors(req: Req, res: Res, next: Next): Promise<void>;
    enrollCourse(req: Req, res: Res, next: Next): Promise<void>;
    paymentStatus(req: Req, res: Res, next: Next): Promise<void>;
    updateReviewAndRating(req: Req, res: Res, next: Next): Promise<void>;
    getSingleCourseReviewAndRating(req: Req, res: Res, next: Next): Promise<void>;
    getThumbnamilImagePresignedUrl(req: Req, res: Res, next: Next): Promise<void>;
    getUserEnrolledCourses(req: Req, res: Res, next: Next): Promise<void>;
    getCourseByCategory(req: Req, res: Res, next: Next): Promise<void>;
    getCourseForSearch(req: Req, res: Res, next: Next): Promise<void>;
    getInstructorTutorials(req: Req, res: Res, next: Next): Promise<void>;
    setVideoTrack(req: Req, res: Res, next: Next): Promise<void>;
}
