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
exports.login = void 0;
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const login = (userRepository, bcrypt, token, cloudSession, email, password, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.findUserByEmail(email);
        if (!user)
            return next(new errorHandler_1.default(400, "invalid email id"));
        if (user.status === "frozen")
            next(new errorHandler_1.default(400, "access has been denied by admin"));
        const hashPassword = user.password;
        const result = yield bcrypt.comparePassword(password, hashPassword);
        if (!result)
            next(new errorHandler_1.default(400, "invalid password id"));
        user.password = "";
        const tokens = yield token.createAccessAndRefreshToken(user === null || user === void 0 ? void 0 : user._id);
        yield cloudSession.createUserSession(user === null || user === void 0 ? void 0 : user._id, user);
        return {
            user,
            tokens,
        };
    }
    catch (error) {
        throw error;
    }
});
exports.login = login;
//# sourceMappingURL=login.js.map