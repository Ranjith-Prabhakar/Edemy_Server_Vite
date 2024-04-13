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
exports.addCourseData = void 0;
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const addCourseData = (courseRepository, userRepository, cloudSesssion, req, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("req.user 4 5 4 5 4", req.user);
        const courseResult = yield courseRepository.addCourseData(Object.assign(Object.assign({}, req.body), { instructor: req.user, price: req.body.price * 1 }));
        const courseData = courseResult.data;
        const userResult = yield userRepository.updateCourses(courseData === null || courseData === void 0 ? void 0 : courseData._id, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        if (userResult) {
            yield cloudSesssion.createUserSession(userResult._id, userResult);
        }
        console.log("userResult === >>>>", userResult);
        return courseResult;
    }
    catch (error) {
        next(new errorHandler_1.default(500, error.message));
    }
});
exports.addCourseData = addCourseData;
//# sourceMappingURL=addCourseData.js.map