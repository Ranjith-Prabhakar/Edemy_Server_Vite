import { IPaymentRespose, TPaymentRequest } from "../request_And_Response/payment";
export interface IPaymentService {
    pay(productData: TPaymentRequest, role: string): Promise<IPaymentRespose | void>;
}
