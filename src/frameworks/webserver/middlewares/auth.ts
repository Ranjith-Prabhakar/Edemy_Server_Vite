import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../../../useCasese/middlewares/errorHandler";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { redis } from "../../../index";
require("dotenv").config();

//authenticated user
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken as string;
  const refreshToken = req.cookies.refreshToken as string;

  if (!accessToken || !refreshToken) {
    console.log("no accessToken || refreshToken");
    return next(new ErrorHandler(400, "please login to  use this resource"));
  }
  // const decodedPayload = jwt.decode(accessToken);
  const decode = (await jwt.verify(
    accessToken ,
    process.env.JWT_ACCESS_KEY as Secret
  )) as JwtPayload;

  if (!decode) {
    return next(new ErrorHandler(400, "Access Token is invalid"));
  }
  const user = await redis.get(decode.id);
  if (!user) {
    console.log("no user session")
    return next(new ErrorHandler(400, "please login to use this resource"));
  }

  req.user = JSON.parse(user);
  console.log("success from isAuth")
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
