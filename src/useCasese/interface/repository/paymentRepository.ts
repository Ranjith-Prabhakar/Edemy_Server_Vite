import { TPaymentRequest } from "../request_And_Response/payment";



export interface IPaymentRepository {
  createCollection(paymentData: TPaymentRequest,userId:string): Promise<boolean | void>;
}