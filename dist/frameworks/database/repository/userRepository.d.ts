import userModel from "../models/userModel";
import { IUserRepository } from "../../../useCasese/interface/repository/userRepository";
import { IUser } from "../../../entities/user";
import { IJsonResponse } from "../../../useCasese/interface/services/jsonResponse";
import { IUserResponse } from "../../../useCasese/interface/request_And_Response/user";
export declare class UserRepository implements IUserRepository {
    private userModels;
    constructor(userModels: typeof userModel);
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
    updateCourses(courseId: string, userId: string): Promise<IUser | void>;
    getAdmin(): Promise<void | IUser>;
}
