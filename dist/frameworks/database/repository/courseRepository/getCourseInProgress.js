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
exports.getCourseInProgress = void 0;
const errorHandler_1 = __importDefault(require("../../../../useCasese/middlewares/errorHandler"));
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const getCourseInProgress = (instructor) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield courseModel_1.default.findOne({
            instructor,
            submissionStatus: "work-in-progress",
        });
        if (result === null)
            throw new errorHandler_1.default(404, "no courses in progress");
        console.log("result ----->>>", result);
        return {
            status: 200,
            message: "course has been found successfully",
            data: result,
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getCourseInProgress = getCourseInProgress;
//# sourceMappingURL=getCourseInProgress.js.map