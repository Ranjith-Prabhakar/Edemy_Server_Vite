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
exports.createUser = void 0;
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const createUser = (userRepository, otpRepository, jwtVerifier, verificationCode, token, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let decode = (yield jwtVerifier.verifyJwt(token));
        if (!decode)
            return next(new errorHandler_1.default(400, "token has been expired ,register again"));
        const result = yield otpRepository.findAndDeleteUser(decode.email, verificationCode);
        if (!result)
            return next(new errorHandler_1.default(400, "verification code mismatch"));
        decode.isVerified = true;
        const newUser = yield userRepository.createUser(decode);
        newUser.password = "";
        return newUser;
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = createUser;
//# sourceMappingURL=createUser.js.map