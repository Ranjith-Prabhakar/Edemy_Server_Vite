import mongoose, { Schema, Model } from "mongoose";
import { ICategory } from "../../../entities/category";

const categorySchema: Schema<ICategory> = new Schema({
  name: {
    type: String,
    minlength: [5, "enter a category with valid length"],
    required: true,
  },
  noOfCourses: Number,
  status: {
    type: String,
    default: "active",
  },
});

const categoryModel: Model<ICategory> = mongoose.model(
  "category",
  categorySchema
);

export default categoryModel;
