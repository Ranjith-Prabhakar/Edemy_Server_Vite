import { IPayment } from "../../../entities/payment";
import { IPaymentRepository } from "../../../useCasese/interface/repository/paymentRepository";
import { TPaymentRequest } from "../../../useCasese/interface/request_And_Response/payment";
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

  async findAndDelete(userId: string): Promise<void | IPayment> {
    try {
      console.log("findAndDelete payment repo engine userId", userId);
      const result = (await paymentModel.findOneAndDelete({ userId })) as IPayment;
      console.log("result", result);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
