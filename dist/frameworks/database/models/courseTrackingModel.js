"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const courseTracking_1 = require("../../../entities/courseTracking");
const courseTrackingSchema = new mongoose_1.default.Schema({
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
            moduleTittle: String,
            videos: [{
                    videoNo: String,
                    videoTittle: String,
                    currentPosition: String,
                    completed: {
                        type: String,
                        enum: Object.values(courseTracking_1.EStatus),
                        default: courseTracking_1.EStatus.notOpened,
                    },
                }],
        },
    ],
});
const courseTrackingModel = mongoose_1.default.model("courseTracking", courseTrackingSchema);
exports.default = courseTrackingModel;
//# sourceMappingURL=courseTrackingModel.js.map