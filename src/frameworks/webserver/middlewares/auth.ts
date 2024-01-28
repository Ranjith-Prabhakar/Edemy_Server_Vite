import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../../../useCasese/handler/errorHandler";
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
    console.log("inside auth mid,isauth, ---1");
    return next(new ErrorHandler(400, "please login to  use this resource"));
  }
console.log("auth middleware before jwt verify");
const decodedPayload = jwt.decode(accessToken);
console.log("Decoded payload", decodedPayload);
  const decode = await jwt.verify(
    accessToken as string,
    process.env.JWT_ACCESS_KEY as Secret
  ) as JwtPayload;

  console.log("auth middleware decode",decode)
  if (!decode) {
    console.log("inside auth mid,isauth, ---2");
    return next(new ErrorHandler(400, "Access Token is invalid"));
  }
  console.log(decode.id === "65b4b4ad7a15703d99955aea");
  console.log("inside auth mid,isauth decoded id", decode.id);
  const user = await redis.get(decode.id);
  console.log("inside auth mid,isauth,  decode...", user);
  if (!user) {
    console.log("inside auth mid,isauth, ---3");
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
