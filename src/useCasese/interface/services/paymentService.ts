import { IPaymentRespose, TPaymentRequest } from "../request_And_Response/payment";

export interface IPaymentService {
  pay(productData:TPaymentRequest): Promise<IPaymentRespose | void>;
}