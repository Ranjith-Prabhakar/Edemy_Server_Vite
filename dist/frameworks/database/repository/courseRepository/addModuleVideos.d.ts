import { IModuleVideoBody } from "../../../../useCasese/interface/request/course";
import { ICourseResponse } from "../../../../useCasese/interface/request_And_Response/course";
export declare const addModuleVideos: (data: IModuleVideoBody, instructor: string) => Promise<ICourseResponse>;
