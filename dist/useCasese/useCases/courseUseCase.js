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
exports.CourseUseCase = void 0;
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
const index_1 = require("./course/index");
const catchError_1 = require("../middlewares/catchError");
const StaticClassProperty_1 = require("../staticClassProperty/StaticClassProperty");
const notification_1 = require("../../entities/notification");
class CourseUseCase {
    constructor(cloudStorage, courseRepository, categoryRepository, paymentService, paymentRepository, userRepository, cloudSesssion, reviewAndRatingRepository, courseTrackingRepository, notificationRepository) {
        this.cloudStorage = cloudStorage;
        this.courseRepository = courseRepository;
        this.categoryRepository = categoryRepository;
        this.paymentService = paymentService;
        this.paymentRepository = paymentRepository;
        this.userRepository = userRepository;
        this.cloudSesssion = cloudSesssion;
        this.reviewAndRatingRepository = reviewAndRatingRepository;
        this.courseTrackingRepository = courseTrackingRepository;
        this.notificationRepository = notificationRepository;
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getCourseInProgress(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getCourseInProgress)(this.courseRepository, req, next);
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    addCourseData(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.addCourseData)(this.courseRepository, this.userRepository, this.cloudSesssion, req, next);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    addFileToCloud(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.addFileToCloud)(this.cloudStorage, this.courseRepository, req, next);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    updateCourse(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.updateCourse)(this.courseRepository, this.userRepository, req, next);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    addModuleVideos(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.addModuleVideos)(this.courseRepository, req, next);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getCourses(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getCourses)(this.courseRepository, next);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getCoursesInRequest(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getCoursesInRequest)(this.courseRepository, next);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getVideoPresignedUrl(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getVideoPresignedUrl)(this.cloudStorage, req, next);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    approveOrRejectVideo(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("req.body ====>>>>", req.body);
                const result = yield (0, index_1.approveOrRejectVideo)(this.courseRepository, req, next);
                const notificationRepoUpdate = yield this.notificationRepository.addNotification(req.body.instructorId, notification_1.ENotification.courseApprovalApprovance);
                if (notificationRepoUpdate) {
                    StaticClassProperty_1.SocketClass.SocketUsers[req.body.instructorId].emit("fromServerCourseApproved", `The ${req.body.courseName} has been approved `);
                    // sendin notification to all online users
                    const activeUsers = Object.values(StaticClassProperty_1.SocketClass.SocketUsers);
                    console.log("activeUsers", activeUsers);
                    activeUsers.forEach(user => user.emit("fromServerCourseApprovedNotificationForAllUsers", `a new course has been added`));
                }
                return result;
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getCoursesForUser(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getCoursesForUser)(this.courseRepository, req, next);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getCategories(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getCategories)(this.categoryRepository, req, next);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getVideoForUser(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getVideoForUser)(this.courseRepository, this.cloudStorage, this.courseTrackingRepository, req, next);
            }
            catch (error) {
                (0, catchError_1.catchError)(error, next);
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getVideoForVisitors(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getVideoForVisitors)(this.courseRepository, this.cloudStorage, req, next);
            }
            catch (error) {
                (0, catchError_1.catchError)(error, next);
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    enrollCourse(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.enrollCourse)(this.paymentService, this.paymentRepository, req, next);
            }
            catch (error) {
                (0, catchError_1.catchError)(error, next);
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    paymentStatus(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.paymentStatus)(this.paymentRepository, this.userRepository, this.courseRepository, this.cloudSesssion, req, next);
            }
            catch (error) {
                (0, catchError_1.catchError)(error, next);
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    updateReviewAndRating(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.updateReviewAndRating)(this.reviewAndRatingRepository, req, next);
            }
            catch (error) {
                (0, catchError_1.catchError)(error, next);
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
    getSingleCourseReviewAndRating(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getSingleCourseReviewAndRating)(this.reviewAndRatingRepository, req, next);
            }
            catch (error) {
                (0, catchError_1.catchError)(error, next);
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
    getThumbnamilImagePresignedUrl(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getThumbnamilImagePresignedUrl)(this.cloudStorage, req, next);
            }
            catch (error) {
                (0, catchError_1.catchError)(error, next);
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
    getUserEnrolledCourses(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getUserEnrolledCourses)(this.courseRepository, req, next);
            }
            catch (error) {
                (0, catchError_1.catchError)(error, next);
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
    getCourseByCategory(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getCourseByCategory)(this.courseRepository, req, next);
            }
            catch (error) {
                (0, catchError_1.catchError)(error, next);
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
    getCourseForSearch(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, index_1.getCourseForSearch)(this.courseRepository, req, next);
                return result;
            }
            catch (error) {
                (0, catchError_1.catchError)(error, next);
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
    getInstructorTutorials(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getInstructorTutorials)(this.courseRepository, req, next);
            }
            catch (error) {
                (0, catchError_1.catchError)(error, next);
            }
        });
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
    setVideoTrack(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.setVideoTrack)(this.courseTrackingRepository, req, next);
            }
            catch (error) {
                (0, catchError_1.catchError)(error, next);
            }
        });
    }
}
exports.CourseUseCase = CourseUseCase;
//# sourceMappingURL=courseUseCase.js.map