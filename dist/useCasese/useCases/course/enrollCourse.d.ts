import { NextFunction } from "express";
import { Req } from "../../../frameworks/types/serverPackageTypes";
import { IPaymentRespose } from "../../interface/request_And_Response/payment";
import { IPaymentService } from "../../interface/services/paymentService";
import { IPaymentRepository } from "../../interface/repository/paymentRepository";
export declare const enrollCourse: (paymentService: IPaymentService, paymentRepository: IPaymentRepository, req: Req, next: NextFunction) => Promise<void | IPaymentRespose>;
