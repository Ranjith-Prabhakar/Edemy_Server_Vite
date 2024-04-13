import { ICourseResponse } from "../../../../useCasese/interface/request_And_Response/course";
export declare const approveOrRejectVideo: (courseId: string, action: string) => Promise<void | ICourseResponse>;
