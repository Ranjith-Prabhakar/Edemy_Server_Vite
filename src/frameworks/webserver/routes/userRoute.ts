import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { userController } from "./injections/userInjuction";
import { isAuthenticated, autheriseRoles } from "../middlewares/auth";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

export function userRoute(router: Route) {
  /////////
  router.post(
    "/register",
    catchAsyncErrors((req: Req, res: Res, next: Next) =>
      userController.registerUser(req, res, next)
    )
  );
  /////////
  router.post(
    "/verify_user",
    catchAsyncErrors((req: Req, res: Res, next: Next) =>
      userController.verifyUser(req, res, next)
    )
  );
  /////////
  router.post(
    "/login",
    catchAsyncErrors((req: Req, res: Res, next: Next) =>
      userController.login(req, res, next)
    )
  );
  /////////
  router.get(
    "/logout",
    isAuthenticated,
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.logout(req, res, next);
    })
  );
  /////////
  router.get(
    "/refresh",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.refresh(req, res, next);
    })
  );
  /////////
  router.post(
    "/be_instructor",
    isAuthenticated,
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.beInstructor(req, res, next);
    })
  );

  return router;
}
