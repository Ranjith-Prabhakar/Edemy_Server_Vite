import { IUser } from "../../../entities/user";
import { IUserResponse } from "../request_And_Response/user";
import { IJsonResponse } from "../services/jsonResponse";
export interface IUserRepository {
    findUserByEmail(email: string): Promise<IUser | null>;
    createUser(newUser: IUser): Promise<IUser>;
    findAndUpdate(data: {
        [key: string]: string | number;
    }): Promise<IJsonResponse>;
    findByIdAndUpdate(id: string, data: {
        [key: string]: string | number;
    }): Promise<IJsonResponse>;
    getUsers(role: string): Promise<IUser[]>;
    getUser(id: string): Promise<IUser>;
    freezUser(id: string): Promise<IUserResponse>;
    unFreezUser(id: string): Promise<IUserResponse>;
    addEnrolledCourse(courseId: string, userId: string): Promise<IUser | void>;
    updateCourses(courseId: string, useId: string): Promise<IUser | void>;
    getAdmin(): Promise<IUser | void>;
}
