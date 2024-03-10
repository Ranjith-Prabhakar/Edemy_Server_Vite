import { ICategory } from "../../../entities/category";
import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICloudStorageResponse } from "../request_And_Response/cloudStorageResponse";
import { ICourseResponse } from "../request_And_Response/course";
import { IPaymentRespose } from "../request_And_Response/payment";
import { IUserResponse } from "../request_And_Response/user";

export interface ICourseUseCase {
  getCourseInProgress(req: Req, next: Next): Promise<ICourseResponse | void>;
  addCourseData(req: Req, next: Next): Promise<ICourseResponse | void>;
  addFileToCloud(req: Req, next: Next): Promise<string | void>;
  updateCourse(req: Req, next: Next): Promise<ICourseResponse | void>;
  addModuleVideos(req: Req, next: Next): Promise<ICourseResponse | void>;
  getCourses(req: Req, next: Next): Promise<ICourseResponse | void>;
  getCoursesInRequest(req: Req, next: Next): Promise<ICourseResponse | void>;
  getVideoPresignedUrl(
    req: Req,
    next: Next
  ): Promise<ICloudStorageResponse | void>;
  approveOrRejectVideo(req: Req, next: Next): Promise<ICourseResponse | void>;
  getCoursesForUser(req: Req, next: Next): Promise<ICourseResponse | void>;
  getCategories(req: Req, next: Next): Promise<ICategory[] | void>;
  getVideoForUser(req: Req, next: Next): Promise<ICloudStorageResponse | void>;
  getVideoForVisitors(
    req: Req,
    next: Next
  ): Promise<ICloudStorageResponse | void>;
  enrollCourse(req: Req, next: Next): Promise<IPaymentRespose | void>;
  paymentStatus(req: Req, next: Next): Promise<IUserResponse | void>;
}
