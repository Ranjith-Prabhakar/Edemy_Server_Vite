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
exports.forgotPasswordOtpVerification = void 0;
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const forgotPasswordOtpVerification = (otpRepository, jwtToken, req, next, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decode = yield jwtToken.verifyJwt(token);
        console.log("forgotPasswordOtpVerification decode", decode);
        if (!decode)
            return next(new errorHandler_1.default(400, "you didn`t made any request for change password"));
        // const isExist = await otpRepository.findUser(decode?.email );
        const isExist = yield otpRepository.findAndVerifyUser(decode === null || decode === void 0 ? void 0 : decode.email, req.body.verificationCode);
        if (!isExist)
            return next(new errorHandler_1.default(400, "entered a wrong OTP..."));
        return { success: true, message: "otp matches " };
    }
    catch (error) {
        return next(new errorHandler_1.default(500, error.message));
    }
});
exports.forgotPasswordOtpVerification = forgotPasswordOtpVerification;
//# sourceMappingURL=forgotPasswordOtpVerification.js.map