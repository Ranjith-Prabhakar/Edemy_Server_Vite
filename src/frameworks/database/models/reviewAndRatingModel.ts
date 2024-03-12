import mongoose, { Model, Schema } from "mongoose";
import { IReviewAndRating } from "../../../entities/reviewAndRating";

const reviewAndRatingSchema: Schema<IReviewAndRating> = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: [true, "please provide course Id"],
      trim: true,
    },
    courseName: {
      type: String,
      required: [true, "please provide course name"],
      trim: true,
    },
    reviewAndRating: [
      {
        userId: {
          type: String,
          required: [true, "please provide user id"],
          trim: true,
        },
        userName: {
          type: String,
          required: [true, "please provide user name"],
          trim: true,
        },
        date: {
          type: Date,
          default: Date.now()
        },
        review: {
          type: String,
          trim: true,
        },
        rating: {
          type: Number,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const reviewAndRatingModel: Model<IReviewAndRating> = mongoose.model(
  "reviewAndRating",
  reviewAndRatingSchema
);

export default reviewAndRatingModel;
