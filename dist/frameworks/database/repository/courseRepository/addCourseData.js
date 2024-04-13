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
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const addCourseData = (courseData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield courseModel_1.default.findOneAndUpdate({
            instructor: courseData.instructor,
            submissionStatus: "work-in-progress",
        }, { $set: Object.assign({}, courseData) }, {
            upsert: true,
            new: true,
        });
        if (result) {
            return {
                status: 201,
                message: "Course data has been created or updated",
                data: result,
            };
        }
        else {
            return {
                status: 404,
                message: "No matching document found or updated",
            };
        }
    }
    catch (error) {
        throw error;
    }
});
exports.addCourseData = addCourseData;
//# sourceMappingURL=addCourseData.js.map