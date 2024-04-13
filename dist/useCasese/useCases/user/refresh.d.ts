import { Req, Next } from "../../../frameworks/types/serverPackageTypes";
import { ICloudSession } from "../../interface/services/cloudSession";
import { IJwt, IToken } from "../../interface/services/jwt.types";
export declare const refresh: (cloudSession: ICloudSession, jwtToken: IJwt, req: Req, next: Next) => Promise<void | IToken>;
