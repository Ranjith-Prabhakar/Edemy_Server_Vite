import { IUser } from "../../../entities/user";

export interface IUserRepository {
  createUser(newUser: IUser): Promise<{user?:IUser ; id?: number ; success:boolean ;message:string}>;
  // findUser(email: string): Promise<IUser | null>;
  // updateUser(id: number, update: Partial<IUser>): Promise<IUser | null>;
  // paginateUsers(pageNumber: number): Promise<IUser[]>;
  // searchUser(pageNumber: number, searchQuery: string): Promise<IUser[]>;
  // getAllParticipants(userIds: number[]): Promise<IUser[]>;
  // checkPassword(password: string): Promise<IUser | null>;
}
