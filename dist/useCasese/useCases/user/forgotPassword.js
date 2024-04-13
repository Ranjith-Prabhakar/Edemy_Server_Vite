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
exports.forgotPassword = void 0;
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const forgotPassword = (otpRepository, userRepository, sendMail, otpGenerator, jwtToken, req, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.findUserByEmail(req.body.email);
        if (!user)
            next(new errorHandler_1.default(400, "user not found for this mail id"));
        const isExistInOtpRep = yield otpRepository.findUser(req.body.email);
        if (isExistInOtpRep) {
            yield sendMail.sendEmailVerification(user === null || user === void 0 ? void 0 : user.name, user === null || user === void 0 ? void 0 : user.email, isExistInOtpRep.otp);
            const verificationToken = yield jwtToken.forgotPasswordToken(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.email);
            return verificationToken;
        }
        else {
            const otp = yield otpGenerator.generateOTP();
            yield sendMail.sendEmailVerification(user === null || user === void 0 ? void 0 : user.name, user === null || user === void 0 ? void 0 : user.email, otp);
            const verificationToken = yield jwtToken.forgotPasswordToken(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.email);
            yield otpRepository.createOtpUserCollection({
                email: user === null || user === void 0 ? void 0 : user.email,
                otp,
            });
            return verificationToken;
        }
    }
    catch (error) {
        return next(new errorHandler_1.default(500, error.message));
    }
});
exports.forgotPassword = forgotPassword;
//# sourceMappingURL=forgotPassword.js.map