import { Model, Schema } from "mongoose";
import { IPayment } from "../../../entities/payment";
import mongoose from "mongoose";

const paymentSchema = new Schema<IPayment>(
  {
    courseId: {
      type: String,
      required: [true, "Course Id is missing"],
      trim: true,
    },
    userId: {
      type: String,
      required: [true, "User Id is missing"],
      trim: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: 30 * 60,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const paymentModel: Model<IPayment> = mongoose.model("payment", paymentSchema);
export default paymentModel;
