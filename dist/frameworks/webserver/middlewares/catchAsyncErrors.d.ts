import { NextFunction, Request, Response } from "express";
export declare const catchAsyncErrors: (theFunc: any) => (req: Request, res: Response, next: NextFunction) => void;
