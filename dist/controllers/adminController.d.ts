import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";
import { IAdminUseCase } from "../useCasese/interface/useCase/adminUseCase";
export declare class AdminController {
    private readonly adminUseCase;
    constructor(adminUseCase: IAdminUseCase);
    approveOrRejectInstructor(req: Req, res: Res, next: Next): Promise<void>;
    instructorRequests(req: Req, res: Res, next: Next): Promise<void>;
    getUsers(req: Req, res: Res, next: Next): Promise<void>;
    getUser(req: Req, res: Res, next: Next): Promise<void>;
    freezUser(req: Req, res: Res, next: Next): Promise<void>;
    unFreezUser(req: Req, res: Res, next: Next): Promise<void>;
    getInstructors(req: Req, res: Res, next: Next): Promise<void>;
    addCategory(req: Req, res: Res, next: Next): Promise<void>;
    getCategories(req: Req, res: Res, next: Next): Promise<void>;
    freezCategory(req: Req, res: Res, next: Next): Promise<void>;
    unFreezCategory(req: Req, res: Res, next: Next): Promise<void>;
}
