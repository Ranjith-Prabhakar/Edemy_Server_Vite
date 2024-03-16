

import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { ICourseResponse } from "../../interface/request_And_Response/course";
import ErrorHandler from "../../middlewares/errorHandler";

export const addCourseData = async (
  courseRepository: ICourseRepository,
  req: Req,
  next: Next
): Promise<ICourseResponse | void> => {
  try {
    console.log("req.user 4 5 4 5 4",req.user)
    return await courseRepository.addCourseData({
      ...req.body,
      instructor: req.user,
      price:req.body.price*1
    });
  } catch (error: any) {
    next(new ErrorHandler(500, error.message));
  }
};
