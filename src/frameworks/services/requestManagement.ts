import { IRequestManagement } from "../../useCasese/interface/services/requestManagement";
import { Res } from "../types/serverPackageTypes";

export class RequestManagement implements IRequestManagement {
  async logoutCleanUp(res: Res): Promise<void> {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
  }
}
