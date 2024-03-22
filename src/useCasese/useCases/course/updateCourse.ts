import { ICourse } from "../../../entities/course";
import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { ICourseResponse } from "../../interface/request_And_Response/course";
import ErrorHandler from "../../middlewares/errorHandler";
import { SocketClass } from "../../staticClassProperty/StaticClassProperty";

export const updateCourse = async (
  courseRepository: ICourseRepository,
  userRepository: IUserRepository,
  req: Req,
  next: Next
): Promise<ICourseResponse | void> => {
  try {
    const courseResutl = await courseRepository.updateCourse(
      req.user?._id as string,
      req.body
    );
    if (courseResutl) {
      console.log("courseResutl ===>", courseResutl);
      const admin = await userRepository.getAdmin();
      if (admin) {
        const adminSocket = SocketClass.SocketUsers[admin._id as string];
        if (adminSocket) {
          adminSocket.emit(
            "fromServerCourseAdded",
            courseResutl.data as ICourse,
            "new course request has been made"
          );
        }
      }
    }
    return courseResutl;
  } catch (error: any) {
    return next(new ErrorHandler(500, error.message));
  }
};
