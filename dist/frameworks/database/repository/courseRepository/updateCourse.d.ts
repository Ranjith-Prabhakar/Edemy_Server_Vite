import { ICourseResponse } from "../../../../useCasese/interface/request_And_Response/course";
export declare const updateCourse: (instructor: string, datum: {
    [key: string]: string;
}) => Promise<ICourseResponse>;
