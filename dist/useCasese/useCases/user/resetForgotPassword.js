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
exports.resetForgotPassword = void 0;
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const resetForgotPassword = (userRepository, otpRepository, jwtVerifier, bcrypt, req, token, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let decode = (yield jwtVerifier.verifyJwt(token));
        console.log("resetForgotPassword decode", decode);
        let otpRepAction = yield otpRepository.findByMailAndDelete(decode.email);
        if (!otpRepAction)
            return next(new errorHandler_1.default(400, "you didn`t make any request to change the password"));
        let password = yield bcrypt.createHash(req.body.password);
        const user = yield userRepository.findByIdAndUpdate(decode.userId, { password: password });
        if (user) {
            return {
                success: true,
                message: "user password has been updated",
            };
        }
    }
    catch (error) {
        throw error;
    }
});
exports.resetForgotPassword = resetForgotPassword;
//# sourceMappingURL=resetForgotPassword.js.map