import mongoose, { Schema, Model } from "mongoose";
import { ICourse, IModule, IReviewRating } from "../../../../entities/course";

const courseSchema: Schema<ICourse> = new Schema({
  name: {
    type: String,
    min: [3, "name should have atleast 3 charactor"],
    required: [true, "please give a valid name"],
    trim: true,
  },
  instructor: {
    type: String,
    min: [3, "name should have atleast 3 charactor"],
    required: [true, "please give a valid name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "please give a valid description"],
    trim: true,
  },
  tags: {
    type: [String],
    required: [true, "please provide some valid tags"],
  },
  thumbnail: {
    type: String,
    required: [true, "please add a thumbnail"],
  },
  uplaoadedDate: {
    type: Date,
  },
  status: {
    type: String,
    default: "pending",
  },
  duration: {
    type: Number,
    required: [true, "please provide the duration"],
  },
  modules: Array<IModule>,
  review: Array<IReviewRating>,
  rating: Number,
  submissionStatus: {
    type: String,
    default: "work-in-progress",
  },
});

const courseModel:Model<ICourse> = mongoose.model("course",courseSchema)
export default courseModel