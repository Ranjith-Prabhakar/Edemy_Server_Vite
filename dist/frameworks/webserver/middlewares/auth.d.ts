import { Request, Response, NextFunction } from "express";
export declare const isAuthenticated: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const autheriseRoles: (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => void;
