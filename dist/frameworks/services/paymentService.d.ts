import { IPaymentRespose, TPaymentRequest } from "../../useCasese/interface/request_And_Response/payment";
import { IPaymentService } from "../../useCasese/interface/services/paymentService";
export declare class PaymentService implements IPaymentService {
    pay(productData: TPaymentRequest, role: string): Promise<void | IPaymentRespose>;
}
