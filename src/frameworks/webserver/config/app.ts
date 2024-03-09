require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "../../../useCasese/middlewares/errorMiddleware";

//routes
import { userRoute } from "../routes/userRoute";
import { adminRoute } from "../routes/adminRoutes";
import { courseRoute } from "../routes/courseRoute";

export const app = express();



app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
    methods: ["GET", "PATCH", "PUT", "POST"],
    optionsSuccessStatus: 204,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", userRoute(express.Router()));
app.use("/api/v1/admin/", adminRoute(express.Router()));
app.use("/api/v1/course/",courseRoute(express.Router()))

//unknown url

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`route ${req.originalUrl} isn't found`) as any;
  error.statusCode = 404;
  next(error);
});

app.use(errorMiddleware);
