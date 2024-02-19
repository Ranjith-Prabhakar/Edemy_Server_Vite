import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { isAuthenticated, autheriseRoles } from "../middlewares/auth";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { adminController } from "./injections/injuctions";

export const adminRoute = (router: Route) => {
  /////////
  router.post(
    "/instructor_approval_or_reject",
    isAuthenticated,
    autheriseRoles("admin"),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.approveOrRejectInstructor(req, res, next);
    })
  );
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888
  router.get(
    "/get_instructor_request",
    isAuthenticated,
    autheriseRoles("admin"),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.instructorRequests(req, res, next);
    })
  );
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888
  router.get(
    "/get_users",
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
  router.post(
    "/freezUser/:id",
    isAuthenticated,
    autheriseRoles("admin"),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.freezUser(req, res, next);
    })
  );
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888
  router.post(
    "/unFreezUser/:id",
    isAuthenticated,
    autheriseRoles("admin"),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.unFreezUser(req, res, next);
    })
  );
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888

  router.get(
    "/get_instructors",
    isAuthenticated,
    autheriseRoles("admin"),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.getInstructors(req, res, next);
    })
  );
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888

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
      adminController.freezCategory(req, res, next);
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
