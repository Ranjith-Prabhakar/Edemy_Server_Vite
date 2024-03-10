import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../../../entities/user";

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter a valid name"],
      min: 3,
    },
    email: {
      type: String,
      required: [true, "please provide a valid email"],
      unique: true,
    },
    password: {
      type: String,
      minLength: [6, "password must be atleast six characters"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    status: {
      type: String,
      default: "active",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        type: String,
      },
    ],
    enrolledCourses: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const userModel: Model<IUser> = mongoose.model("user", userSchema);
export default userModel;
