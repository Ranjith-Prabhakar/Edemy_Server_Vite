import { ICourse } from "../../../entities/course";
import { IModuleVideoBody } from "../request/course";
import { ICourseCategoryBaseResponse, ICourseResponse } from "../request_And_Response/course";
export interface ICourseRepository {
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
    getUserEnrolledCourses(courses: string[]): Promise<ICourseResponse | void>;
    getCourseByCategory(category: string, pageNumber: number, frequency: number, sort: string, filter: string): Promise<ICourseCategoryBaseResponse | void>;
    getCourseForSearch(key: string, pageNumber: number, frequency: number, sort: string, filter: string): Promise<ICourseCategoryBaseResponse | void>;
    getInstructorTutorials(courses: string[]): Promise<ICourseResponse | void>;
}
