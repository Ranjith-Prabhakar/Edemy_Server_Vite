import { IUser } from "../../../entities/user";
export interface Response {
    status: number;
    success: boolean;
    message?: string;
    user?: IUser;
    token?: string;
}
