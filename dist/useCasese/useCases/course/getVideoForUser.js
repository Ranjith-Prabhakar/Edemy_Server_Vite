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
exports.getVideoForUser = void 0;
const catchError_1 = require("../../middlewares/catchError");
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const getVideoForUser = (courseRepository, cloudStorage, courseTrackingRepository, req, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    try {
        const { courseId, moduleNo, videoNo, videoName } = req.body;
        console.log("req.user?.courses", (_a = req.user) === null || _a === void 0 ? void 0 : _a.courses);
        console.log("courseId", courseId);
        if (((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin") {
            ///
            const position = yield courseTrackingRepository.getVideoTracking(courseId, req.user._id, moduleNo, videoNo);
            if (position) {
                const cloudResponse = yield cloudStorage.getVideoPresignedUrl(videoName);
                return Object.assign(Object.assign({}, cloudResponse), position);
            }
            else {
                return yield cloudStorage.getVideoPresignedUrl(videoName);
            }
        }
        else if (((_c = req.user) === null || _c === void 0 ? void 0 : _c.role) === "instructor" &&
            ((_e = (_d = req.user) === null || _d === void 0 ? void 0 : _d.courses) === null || _e === void 0 ? void 0 : _e.includes(courseId))) {
            ///
            const position = yield courseTrackingRepository.getVideoTracking(courseId, req.user._id, moduleNo, videoNo);
            ///
            if (position) {
                const cloudResponse = yield cloudStorage.getVideoPresignedUrl(videoName);
                return Object.assign(Object.assign({}, cloudResponse), position);
            }
            else {
                return yield cloudStorage.getVideoPresignedUrl(videoName);
            }
        }
        else {
            const isEnrolled = (_g = (_f = req.user) === null || _f === void 0 ? void 0 : _f.enrolledCourses) === null || _g === void 0 ? void 0 : _g.includes(courseId);
            if (isEnrolled) {
                ///
                const position = yield courseTrackingRepository.getVideoTracking(courseId, (_h = req.user) === null || _h === void 0 ? void 0 : _h._id, moduleNo, videoNo);
                ///
                if (position) {
                    const cloudResponse = yield cloudStorage.getVideoPresignedUrl(videoName);
                    return Object.assign(Object.assign({}, cloudResponse), position);
                }
                else {
                    return yield cloudStorage.getVideoPresignedUrl(videoName);
                }
            }
            const isPreview = yield courseRepository.isPreview(courseId, moduleNo, videoNo);
            if (isPreview) {
                return yield cloudStorage.getVideoPresignedUrl(videoName);
            }
            else {
                return next(new errorHandler_1.default(404, "you have to purchase the course to watch the video"));
            }
        }
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
});
exports.getVideoForUser = getVideoForUser;
//# sourceMappingURL=getVideoForUser.js.map