import mongoose, { Schema, Model } from "mongoose";
import { INotification } from "../../../entities/notification";

const notificationSchema: Schema<INotification> = new mongoose.Schema({
  userId: { type: String, required: [true, "provide a user Id"] },
  instructorRequests: {
    type: String,
  },
  instructorRequestApproval: {
    type: String,
  },
  courseApprovalRequest: {
    type: String,
  },
  courseApprovalApprovance: {
    type: String,
  },
  broadCasting: [],
});

const notificationModel: Model<INotification> = mongoose.model(
  "notification",
  notificationSchema
);
export default notificationModel;
