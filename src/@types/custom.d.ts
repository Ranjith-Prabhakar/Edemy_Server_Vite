import { Request } from "express";
import { IUser } from "../entities/user";

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }

}