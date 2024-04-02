import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { userController } from "./injections/injuctions";
import { isAuthenticated } from "../middlewares/auth";
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
  router.post(
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
    "/forgot_password_email_submission",
    (req: Req, res: Res, next: Next) => {
      console.log("reaching==. forgot_password_email_submission");
      next();
    },
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.forgotPassword(req, res, next);
    })
  );
  /////////

  router.post(
    "/forgot_password_otp_verification",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.forgotPasswordOtpVerification(req, res, next);
    })
  );
  router.post(
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
  //
  router.get(
    "/get_notifications",
    isAuthenticated,
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.getNotifications(req, res, next);
    })
  );
  //
  router.post(
    "/update_notification",
    isAuthenticated,
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      userController.updateNotifications(req, res, next);
    })
  );
  
  return router;
}
