import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { courseController } from "./injections/injuctions";
import { isAuthenticated, autheriseRoles } from "../middlewares/auth";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

export function courseRoute(router: Route) {
  router.get(
    "/get_course_in_progress",
    isAuthenticated,
    autheriseRoles("instructor"),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      courseController.getCourseInProgress(req, res, next);
    })
  );
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  router.post(
    "/addCourseData",
    isAuthenticated,
    autheriseRoles("instructor"),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      courseController.addCourseData(req, res, next); // adds only data but videos
    })
  );
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  router.post(
    "/addModule",
    isAuthenticated,
    autheriseRoles("instructor"),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      courseController.addModule(req, res, next);
    })
  );
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888
 router.post(
   "/updateCourse",
   isAuthenticated,
   autheriseRoles("instructor"),
   catchAsyncErrors((req: Req, res: Res, next: Next) => {
     courseController.updateCourse(req, res, next);
   })
 );
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888
 router.post(
   "/add_Module_Videos",
   isAuthenticated,
   autheriseRoles("instructor"),
   catchAsyncErrors((req: Req, res: Res, next: Next) => {
     courseController.addModuleVideos(req, res, next);
   })
 );

  router.get(
    "/get_courses",
    isAuthenticated,
    autheriseRoles("admin"),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      courseController.getCourses(req, res, next);
    })
  );

  router.get(
    "/get_courses_in_Request",
    isAuthenticated,
    autheriseRoles("admin"),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      courseController.getCoursesInRequest(req, res, next);
    })
  );




  return router;
}
