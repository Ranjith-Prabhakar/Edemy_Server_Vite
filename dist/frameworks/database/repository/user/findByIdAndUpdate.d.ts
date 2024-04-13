import { IJsonResponse } from "../../../../useCasese/interface/services/jsonResponse";
export declare const findByIdAndUpdate: (id: string, data: {
    [key: string]: string | number;
}) => Promise<IJsonResponse>;
