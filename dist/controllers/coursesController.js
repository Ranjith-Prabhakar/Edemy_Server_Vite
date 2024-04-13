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
exports.CoursesController = void 0;
const errorHandler_1 = __importDefault(require("../useCasese/middlewares/errorHandler"));
const inputValidation_1 = require("./middleware/inputValidation");
class CoursesController {
    constructor(courseUseCase) {
        this.courseUseCase = courseUseCase;
    }
    getCourseInProgress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "getCourseInProgress", next);
                const result = yield this.courseUseCase.getCourseInProgress(req, next);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    addCourseData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "addCourseData", next);
                const result = yield this.courseUseCase.addCourseData(req, next);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    addFileToCloud(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "addFileToCloud", next);
                const result = yield this.courseUseCase.addFileToCloud(req, next);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    updateCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "updateCourse", next);
                const result = yield this.courseUseCase.updateCourse(req, next);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    addModuleVideos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "addModuleVideos", next);
                const result = yield this.courseUseCase.addModuleVideos(req, next);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getCourses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.courseUseCase.getCourses(req, next);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getCoursesInRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.courseUseCase.getCoursesInRequest(req, next);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getVideoPresignedUrl(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "getVideoPresignedUrl", next);
                const result = yield this.courseUseCase.getVideoPresignedUrl(req, next);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    approveOrRejectVideo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "approveOrRejectVideo", next);
                const result = yield this.courseUseCase.approveOrRejectVideo(req, next);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getCoursesForUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "getCoursesForUser", next);
                const result = yield this.courseUseCase.getCoursesForUser(req, next);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.courseUseCase.getCategories(req, next);
                res.status(200).json({
                    success: true,
                    message: "categories fectched successfully",
                    data: result,
                });
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getVideoForUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "getVideoForUser", next);
                const result = yield this.courseUseCase.getVideoForUser(req, next);
                if (result)
                    res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getVideoForVisitors(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "getVideoForVisitors", next);
                const result = yield this.courseUseCase.getVideoForVisitors(req, next);
                if (result)
                    res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    enrollCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "enrollCourse", next);
                const result = yield this.courseUseCase.enrollCourse(req, next);
                if (result)
                    res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    paymentStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "paymentStatus", next);
                const result = yield this.courseUseCase.paymentStatus(req, next);
                if (result)
                    res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    updateReviewAndRating(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "updateReviewAndRating", next);
                const result = yield this.courseUseCase.updateReviewAndRating(req, next);
                if (result)
                    res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getSingleCourseReviewAndRating(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.courseUseCase.getSingleCourseReviewAndRating(req, next);
                if (result)
                    res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getThumbnamilImagePresignedUrl(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.courseUseCase.getThumbnamilImagePresignedUrl(req, next);
                if (result)
                    res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getUserEnrolledCourses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "getUserEnrolledCourses", next);
                const result = yield this.courseUseCase.getUserEnrolledCourses(req, next);
                if (result)
                    res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getCourseByCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "getCourseByCategory", next);
                const result = yield this.courseUseCase.getCourseByCategory(req, next);
                if (result)
                    res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getCourseForSearch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "getCourseForSearch", next);
                const result = yield this.courseUseCase.getCourseForSearch(req, next);
                if (result)
                    res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getInstructorTutorials(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "getInstructorTutorials", next);
                const result = yield this.courseUseCase.getInstructorTutorials(req, next);
                if (result)
                    res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    setVideoTrack(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "setVideoTrack", next);
                const result = yield this.courseUseCase.setVideoTrack(req, next);
                if (result)
                    res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
}
exports.CoursesController = CoursesController;
//# sourceMappingURL=coursesController.js.map