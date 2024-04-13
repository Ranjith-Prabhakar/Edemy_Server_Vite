import { Res } from "../../../frameworks/types/serverPackageTypes";
export interface IRequestManagement {
    logoutCleanUp(res: Res): Promise<void>;
}
