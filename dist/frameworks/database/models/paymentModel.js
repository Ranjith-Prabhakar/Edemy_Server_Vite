"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
const paymentModel = mongoose_2.default.model("payment", paymentSchema);
exports.default = paymentModel;
//# sourceMappingURL=paymentModel.js.map