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
exports.paymentStatus = void 0;
const catchError_1 = require("../../middlewares/catchError");
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const paymentStatus = (paymentRepository, userRepository, courseRepository, cloudSession, req, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const courseData = (yield paymentRepository.findAndDelete((_a = req.user) === null || _a === void 0 ? void 0 : _a._id));
        if (courseData) {
            const [newUserData, isPurchaseUpdated] = yield Promise.all([
                userRepository.addEnrolledCourse(courseData.courseId, (_b = req.user) === null || _b === void 0 ? void 0 : _b._id),
                courseRepository.updatePurchas(courseData.courseId),
            ]);
            if (newUserData && isPurchaseUpdated) {
                yield cloudSession.createUserSession((_c = req.user) === null || _c === void 0 ? void 0 : _c._id, newUserData);
                return {
                    success: true,
                    message: "course has been added to the user collection",
                    data: newUserData,
                };
            }
            else {
                return next(new errorHandler_1.default(400, "please try again,something went wrong!!!"));
            }
        }
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
});
exports.paymentStatus = paymentStatus;
//# sourceMappingURL=paymentStatus.js.map