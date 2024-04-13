"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewAndRatingSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
const reviewAndRatingModel = mongoose_1.default.model("reviewAndRating", reviewAndRatingSchema);
exports.default = reviewAndRatingModel;
//# sourceMappingURL=reviewAndRatingModel.js.map