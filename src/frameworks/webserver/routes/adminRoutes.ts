import { Route,Req,Res,Next } from "../../types/serverPackageTypes";
import { isAuthenticated,autheriseRoles } from "../middlewares/auth";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { adminController } from "./injections/injuctions";

  export const adminRoute = (router: Route) => {
    /////////
    router.patch(
      "/instructor_approval",
      isAuthenticated,
      autheriseRoles("admin"),
      catchAsyncErrors((req: Req, res: Res, next: Next) => {
        adminController.approveInstructor(req, res, next);
      })
    );
    return router;
  };