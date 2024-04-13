"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
const userModel = mongoose_1.default.model("user", userSchema);
exports.default = userModel;
//# sourceMappingURL=userModel.js.map