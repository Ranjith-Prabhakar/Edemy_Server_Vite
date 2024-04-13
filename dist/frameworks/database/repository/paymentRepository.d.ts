import { IPayment } from "../../../entities/payment";
import { IPaymentRepository } from "../../../useCasese/interface/repository/paymentRepository";
import { TPaymentRequest } from "../../../useCasese/interface/request_And_Response/payment";
export declare class PaymentRepository implements IPaymentRepository {
    createCollection(paymentData: TPaymentRequest, userId: string): Promise<boolean | void>;
    findAndDelete(userId: string): Promise<void | IPayment>;
}
