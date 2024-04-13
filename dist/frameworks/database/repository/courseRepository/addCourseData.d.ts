import { ICourse } from "../../../../entities/course";
import { ICourseResponse } from "../../../../useCasese/interface/request_And_Response/course";
export declare const addCourseData: (courseData: ICourse) => Promise<ICourseResponse>;
