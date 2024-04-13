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
exports.enrollCourse = void 0;
const catchError_1 = require("../../middlewares/catchError");
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const enrollCourse = (paymentService, paymentRepository, req, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const stripeGateWay = yield paymentService.pay(req.body, (_a = req.user) === null || _a === void 0 ? void 0 : _a.role);
        if (stripeGateWay) {
            const result = yield paymentRepository.createCollection(req.body[0], (_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
            if (result)
                return stripeGateWay;
            return next(new errorHandler_1.default(500, "something went wrong try again"));
        }
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
});
exports.enrollCourse = enrollCourse;
//# sourceMappingURL=enrollCourse.js.map