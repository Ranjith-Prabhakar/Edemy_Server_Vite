import { IPaymentRepository } from "../../../../useCasese/interface/repository/paymentRepository";
import { TPaymentRequest } from "../../../../useCasese/interface/request_And_Response/payment";
import paymentModel from "../models/paymentModel";

export class PaymentRepository implements IPaymentRepository {
  async createCollection(
    paymentData: TPaymentRequest,
    userId: string
  ): Promise<boolean | void> {
    try {
      const result = await paymentModel.create({ ...paymentData, userId });
      if (result) return true;
      return false;
    } catch (error) {
      throw error;
    }
  }
}
