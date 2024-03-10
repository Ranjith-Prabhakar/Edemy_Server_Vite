import {
  IPaymentRespose,
  TPaymentRequest,
} from "../../useCasese/interface/request_And_Response/payment";
import { IPaymentService } from "../../useCasese/interface/services/paymentService";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class PaymentService implements IPaymentService {
  async pay(productData: TPaymentRequest,role:string): Promise<void | IPaymentRespose> {
    try {
      const lineItems = productData.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.courseName,
          },
          unit_amount: Math.round(+product.price * 100),
        },
        quantity: 1,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: lineItems,
        success_url: `${process.env.CLIENT}/${role}/payment_success`,
        cancel_url: `${process.env.CLIENT}/cancel`,
      });
      return { status: 200, message: "pay now", data: session.url as string };
    } catch (error) {
      throw error;
    }
  }
}
