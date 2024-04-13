"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPreview = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const isPreview = (courseId, moduleNo, videoNo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("get_video_for_users repo engine", `modules.${moduleNo}.videos.${videoNo}`);
        const result = yield courseModel_1.default.findOne({
            _id: courseId,
            modules: {
                $elemMatch: {
                    moduleNo: moduleNo,
                    videos: {
                        $elemMatch: {
                            videoNo: videoNo,
                            preview: true,
                        },
                    },
                },
            },
            // [`modules.${moduleNo}.videos.${videoNo}`]:true,
        });
        console.log("get_video_for_users repo engine", result);
        if (result) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log("get_video_for_users repo engine errro", error);
        throw error;
    }
});
exports.isPreview = isPreview;
//# sourceMappingURL=isPreview.js.map