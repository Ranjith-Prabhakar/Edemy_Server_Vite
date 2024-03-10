import { NextFunction } from "express";
import { Req } from "../../../frameworks/types/serverPackageTypes";
import {
  IPaymentRespose,
  TPaymentRequest,
} from "../../interface/request_And_Response/payment";
import { catchError } from "../../middlewares/catchError";
import { IPaymentService } from "../../interface/services/paymentService";
import { IPaymentRepository } from "../../interface/repository/paymentRepository";
import ErrorHandler from "../../middlewares/errorHandler";

export const enrollCourse = async (
  paymentService: IPaymentService,
  paymentRepository: IPaymentRepository,
  req: Req,
  next: NextFunction
): Promise<void | IPaymentRespose> => {
  try {
    const stripeGateWay = await paymentService.pay(
      req.body as TPaymentRequest,
      req.user?.role as string
    );
    if (stripeGateWay) {
      const result = await paymentRepository.createCollection(
        req.body[0] as TPaymentRequest,
        req.user?._id as string
      );
      if (result) return stripeGateWay;
      return next(new ErrorHandler(500, "something went wrong try again"));
    }
  } catch (error) {
    catchError(error, next);
  }
};
