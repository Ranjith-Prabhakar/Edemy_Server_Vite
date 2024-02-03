import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { userController } from "./injections/injuctions";
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
    "/create_user",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      console.log(req.cookies.verificationToken, "route");
      userController.createUser(req, res, next);
    })
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
    isAuthenticated,
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
  /////////
  router.post(
    "/forgot_password",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.forgotPassword(req, res, next);
    })
  );
  /////////
  router.patch(
    "/reset_forgot_password",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.resetForgotPassword(req, res, next);
    })
  );
  //////////
  router.get(
    "/user_session",
    isAuthenticated,
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.userSession(req, res, next);
    })
  );

  return router;
}
