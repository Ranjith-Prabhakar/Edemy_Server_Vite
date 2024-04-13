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
exports.registerUser = void 0;
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const catchError_1 = require("../../middlewares/catchError");
const registerUser = (otpRepository, userRepository, sendMail, otpGenerator, jwtTokenGenerator, bcrypt, email, name, password, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // checking whether any user exist in the same email
        const isUserExistOnUserRepo = yield userRepository.findUserByEmail(email);
        if (isUserExistOnUserRepo)
            return next(new errorHandler_1.default(400, "user!!! already exist in the same mail id"));
        // checking wheter user already present in the otp repo
        let isUserOnOtpRepo = yield otpRepository.findUser(email);
        if (isUserOnOtpRepo) {
            yield sendMail.sendEmailVerification(name, email, isUserOnOtpRepo.otp);
            const hashPassword = yield bcrypt.createHash(password);
            password = hashPassword;
            const jwtToken = yield jwtTokenGenerator.createVerificationJWT({
                name,
                email,
                password,
            });
            return jwtToken;
        }
        else {
            const otp = yield otpGenerator.generateOTP();
            yield otpRepository.createOtpUserCollection({ email, otp });
            yield sendMail.sendEmailVerification(name, email, otp);
            const hashPassword = yield bcrypt.createHash(password);
            password = hashPassword;
            const jwtToken = yield jwtTokenGenerator.createVerificationJWT({
                name,
                email,
                password,
            });
            return jwtToken;
        }
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
});
exports.registerUser = registerUser;
//# sourceMappingURL=registerUser.js.map