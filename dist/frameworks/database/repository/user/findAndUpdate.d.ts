import { IJsonResponse } from "../../../../useCasese/interface/services/jsonResponse";
import userModel from "../../models/userModel";
export declare const findAndUpdate: (data: {
    [key: string]: string | number;
}, userModels: typeof userModel) => Promise<IJsonResponse>;
