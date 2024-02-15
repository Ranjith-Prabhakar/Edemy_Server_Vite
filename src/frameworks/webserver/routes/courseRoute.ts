import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { courseController } from "./injections/injuctions";
import { isAuthenticated, autheriseRoles } from "../middlewares/auth";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

export function courseRoute(router: Route) {
  router.get(
    "/get_course_in_progress",
    isAuthenticated,
    autheriseRoles("instructor"),
    catchAsyncErrors((req:Req,res:Res,next:Next)=>{
      courseController.getCourseInProgress(req,res,next)
    })
  );
  router.post(
    "/addModule",
    isAuthenticated,
    autheriseRoles("instructor"),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      courseController.addModule(req, res, next);
    })
  );
  return router;
}
