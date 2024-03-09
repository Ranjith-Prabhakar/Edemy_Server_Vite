import { NextFunction } from "express";
import { Req } from "../../../frameworks/types/serverPackageTypes";
import {
  IPaymentRespose,
  TPaymentRequest,
} from "../../interface/request_And_Response/payment";
import { catchError } from "../../middlewares/catchError";
import { IPaymentService } from "../../interface/services/paymentService";

export const enrollCourse = async (
  paymentService: IPaymentService,
  req: Req,
  next: NextFunction
): Promise<void | IPaymentRespose> => {
  try {
    const stripeGateWay = await paymentService.pay(req.body as TPaymentRequest);
    if(stripeGateWay){
      
    }
    return stripeGateWay

  } catch (error) {
    catchError(error, next);
  }
};
