import { IUser } from "../../../entities/user";
import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
export declare const userSession: (req: Req, next: Next) => Promise<IUser | void>;
