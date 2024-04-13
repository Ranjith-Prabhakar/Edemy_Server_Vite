import { CloudSession } from "../../../frameworks/services/cloudSession";
import { Req, Res, Next } from "../../../frameworks/types/serverPackageTypes";
import { IRequestManagement } from "../../interface/services/requestManagement";
export declare const logout: (cloudSession: CloudSession, requestManagement: IRequestManagement, req: Req, res: Res, next: Next) => Promise<void>;
