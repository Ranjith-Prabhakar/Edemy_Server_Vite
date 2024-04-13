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
exports.updateCourse = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const updateCourse = (instructor, datum) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield courseModel_1.default.findOneAndUpdate({
            instructor,
            submissionStatus: "work-in-progress",
        }, { $set: Object.assign({}, datum) }, { new: true });
        console.log("result from updateCourse", datum);
        if (result) {
            return {
                status: 200,
                message: "Document has been updated successfully",
                data: result,
            };
        }
        else {
            return {
                status: 404,
                message: "No document was updated",
            };
        }
    }
    catch (error) {
        throw error;
    }
});
exports.updateCourse = updateCourse;
//# sourceMappingURL=updateCourse.js.map