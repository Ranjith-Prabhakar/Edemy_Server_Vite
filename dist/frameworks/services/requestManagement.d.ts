import { IRequestManagement } from "../../useCasese/interface/services/requestManagement";
import { Res } from "../types/serverPackageTypes";
export declare class RequestManagement implements IRequestManagement {
    logoutCleanUp(res: Res): Promise<void>;
}
