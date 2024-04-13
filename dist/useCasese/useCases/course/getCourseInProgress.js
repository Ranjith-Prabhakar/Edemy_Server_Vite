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
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const getCourseInProgress = (courseRepository, req, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        return yield courseRepository.getCourseInProgress((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    }
    catch (error) {
        next(new errorHandler_1.default(500, error.message));
    }
});
exports.getCourseInProgress = getCourseInProgress;
//# sourceMappingURL=getCourseInProgress.js.map