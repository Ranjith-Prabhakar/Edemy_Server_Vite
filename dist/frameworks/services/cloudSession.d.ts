import { IUser } from "../../entities/user";
import { ICloudSession } from "../../useCasese/interface/services/cloudSession";
import { IJsonResponse } from "../../useCasese/interface/services/jsonResponse";
export declare class CloudSession implements ICloudSession {
    createUserSession(id: string, user: IUser): Promise<string>;
    clearUserSession(id: string): Promise<number>;
    getUser(id: string): Promise<string | IJsonResponse>;
}
