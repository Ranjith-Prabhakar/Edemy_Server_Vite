import mongoose, { Model, Schema } from "mongoose";
import { EStatus, ICourseTracking } from "../../../entities/courseTracking";
const courseTrackingSchema: Schema<ICourseTracking> = new mongoose.Schema({
  courseId: {
    type: String,
    required: [true, "course is missing"],
  },
  userId: {
    type: String,
    required: [true, "userId is missing"],
  },
  modules: [
    {
      moduleNo: String,
      moduleTittle:String,
      videos: [{
        videoNo: String,
        videoTittle:String,
        currentPosition: String,
        completed: {
          type: String,
          enum: Object.values(EStatus),
          default: EStatus.notOpened,
        },
      }],
    },
  ],
});

const courseTrackingModel: Model<ICourseTracking> = mongoose.model(
  "courseTracking",
  courseTrackingSchema
);

export default courseTrackingModel;
