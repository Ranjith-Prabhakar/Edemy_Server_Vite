import { IUser } from "../../../entities/user";
import { IJsonResponse } from "./jsonResponse";
export interface ICloudSession {
    createUserSession(id: string, user: IUser): Promise<string>;
    clearUserSession(id: string): Promise<number>;
    getUser(id: string): Promise<string | IJsonResponse>;
}
