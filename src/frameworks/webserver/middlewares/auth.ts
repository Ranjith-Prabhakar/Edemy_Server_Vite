import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../../../useCasese/handler/errorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../../../index";
import { IUser } from "../../../entities/user";
require("dotenv").config()

//authenticated user
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken as string;
  const refreshToken = req.cookies.refreshToken as string
  console.log("secre", process.env.JWT_ACCESS_KEY);
  if (!accessToken || !refreshToken) {
    return next(new ErrorHandler(400, "please login to  use this resource"));
  }

  const decode = jwt.verify(
    accessToken,
    process.env.JWT_ACCESS_KEY as string
  ) as IUser;
  if (!decode) {
    return next(new ErrorHandler(400, "Access Token is invalid"));
  }
  const user = await redis.get(decode._id as string);
  if (!user) {
    return next(new ErrorHandler(400, "please login to use this resource"));
  }

  req.user = JSON.parse(user);
  next();
};

//validate user role
export const autheriseRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          401,
          `role:${req.user?.role} is not allowed to use this resource`
        )
      );
    }
    next();
  };
};
