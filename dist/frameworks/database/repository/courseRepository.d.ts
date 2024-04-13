import { ICourse } from "../../../entities/course";
import { ICourseRepository } from "../../../useCasese/interface/repository/courseRepository";
import { IModuleVideoBody } from "../../../useCasese/interface/request/course";
import { ICourseCategoryBaseResponse, ICourseResponse } from "../../../useCasese/interface/request_And_Response/course";
export declare class CourseRepository implements ICourseRepository {
    constructor();
    getCourseInProgress(instructor: string): Promise<ICourseResponse>;
    addCourseData(courseData: ICourse): Promise<ICourseResponse>;
    updateCourse(instructor: string, datum: {
        [key: string]: string;
    }): Promise<ICourseResponse>;
    addModuleVideos(data: IModuleVideoBody, instructor: string): Promise<ICourseResponse>;
    findByName(courseName: string): Promise<string | void>;
    getCourses(): Promise<void | ICourseResponse>;
    getCoursesInRequest(): Promise<void | ICourseResponse>;
    approveOrRejectVideo(courseId: string, action: string): Promise<void | ICourseResponse>;
    getCoursesForUser(): Promise<void | ICourseResponse>;
    isPreview(courseId: string, moduleNo: string, videoNo: string): Promise<boolean>;
    updatePurchas(courseId: string): Promise<boolean | void>;
    getUserEnrolledCourses(courses: string[]): Promise<void | ICourseResponse>;
    getCourseByCategory(category: string, pageNumber: number, frequency: number, sort: string, filter: string): Promise<void | ICourseCategoryBaseResponse>;
    getCourseForSearch(key: string, pageNumber: number, frequency: number, sort: string, filter: string): Promise<void | ICourseCategoryBaseResponse>;
    getInstructorTutorials(courses: string[]): Promise<void | ICourseResponse>;
}
