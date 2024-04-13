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
exports.getVideoForVisitors = void 0;
const catchError_1 = require("../../middlewares/catchError");
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const getVideoForVisitors = (courseRepository, cloudStorage, req, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId, moduleNo, videoNo, videoName } = req.body;
        const isPreview = yield courseRepository.isPreview(courseId, moduleNo, videoNo);
        if (isPreview) {
            return yield cloudStorage.getVideoPresignedUrl(videoName);
        }
        else {
            return next(new errorHandler_1.default(404, "you have to purchase the course to watch the video"));
        }
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
});
exports.getVideoForVisitors = getVideoForVisitors;
//# sourceMappingURL=getVideoForVisitors.js.map