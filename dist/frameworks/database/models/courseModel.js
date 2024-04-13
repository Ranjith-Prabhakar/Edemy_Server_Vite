"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const courseSchema = new mongoose_1.Schema({
    price: {
        type: Number,
        required: [true, "please give a valid category"],
        trim: true,
    },
    category: {
        type: String,
        min: [3, "name should have atleast 3 charactor"],
        required: [true, "please give a valid category"],
        trim: true,
    },
    courseName: {
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
    instructorId: {
        type: String,
    },
    discription: {
        type: String,
        required: [true, "please give a valid description"],
        trim: true,
    },
    tags: {
        type: String,
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
        type: String,
        required: [true, "please provide the duration"],
    },
    modules: (Array),
    review: (Array),
    rating: Number,
    noOfPurchase: {
        type: Number,
        default: 0,
    },
    submissionStatus: {
        type: String,
        default: "work-in-progress",
    },
});
const courseModel = mongoose_1.default.model("course", courseSchema);
exports.default = courseModel;
//# sourceMappingURL=courseModel.js.map