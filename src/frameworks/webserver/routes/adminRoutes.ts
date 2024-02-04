import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { isAuthenticated, autheriseRoles } from "../middlewares/auth";
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
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888
  router.get(
    "/users",
    isAuthenticated,
    autheriseRoles("admin"),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.getUsers(req, res, next);
    })
  );
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888
  router.get(
    "/user/:id",
    isAuthenticated,
    autheriseRoles("admin"),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.getUser(req, res, next);
    })
  );
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888
  router.patch(
    "/freezUser/:id",
    isAuthenticated,
    autheriseRoles("admin"),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.freezUser(req, res, next);
    })
  );

  router.post(
    "/add_category",
    isAuthenticated,
    autheriseRoles("admin"),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.addCategory(req, res, next);
    })
  );

  router.get(
    "/get_categories",
    isAuthenticated,
    autheriseRoles("admin"),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.getCategories(req, res, next);
    })
  );

  router.post(
    "/freezCategory/:id",
    isAuthenticated,
    autheriseRoles("admin"),
    (req: Req, res: Res, next: Next) => {
      adminController.freezCategory(req,res,next)
    }
  );

  router.post(
    "/unFreezCategory/:id",
    isAuthenticated,
    autheriseRoles("admin"),
    (req: Req, res: Res, next: Next) => {
      adminController.unFreezCategory(req, res, next);
    }
  );

  return router;
};
