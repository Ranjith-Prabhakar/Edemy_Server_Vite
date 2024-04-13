import { ICourseCategoryBaseResponse } from "../../../../useCasese/interface/request_And_Response/course";
export declare const getCourseForSearch: (key: string, pageNumber: number, frequency: number, sort: string, filter: string) => Promise<void | ICourseCategoryBaseResponse>;
