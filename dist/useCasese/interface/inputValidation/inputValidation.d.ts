import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
export type TInputValidation = (req: Req, route: string, next: Next) => Promise<boolean | void>;
