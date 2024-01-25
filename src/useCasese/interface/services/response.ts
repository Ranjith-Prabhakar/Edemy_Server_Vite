import { IUser } from "../../../entities/user";

export interface Response<T = IUser| IUser[]|string> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
}