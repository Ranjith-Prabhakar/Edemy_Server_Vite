import { ICourseResponse } from "../../../../useCasese/interface/request_And_Response/course";
export declare const getUserEnrolledCourses: (courses: string[]) => Promise<void | ICourseResponse>;
