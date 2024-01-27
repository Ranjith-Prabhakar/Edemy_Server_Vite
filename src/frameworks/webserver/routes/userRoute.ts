import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { userController } from "./injections/userInjuction";

export function userRoute(router: Route) {
  /////////
  router.post("/register", (req: Req, res: Res, next: Next) =>
    userController.registerUser(req, res, next)
  );
  /////////
  router.post("/verify_user", (req: Req, res: Res, next: Next) =>
    userController.verifyUser(req, res, next)
  );
  /////////
  router.post("/login", (req: Req, res: Res, next: Next) =>
    userController.login(req, res, next)
  );
  /////////
  

  return router;
}
