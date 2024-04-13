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
exports.JWTtoken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
class JWTtoken {
    constructor() {
        // ***************************************************************************************
        this.JWT_VERIFICATION_KEY = process.env.JWT_VERIFICATION_KEY || "";
        this.JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY || "";
        this.JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || "";
    }
    createVerificationJWT(payLoad) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyToken = yield jsonwebtoken_1.default.sign(payLoad, this.JWT_VERIFICATION_KEY, {
                expiresIn: "15m",
            });
            return verifyToken;
        });
    }
    // ***************************************************************************************
    createAccessAndRefreshToken(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield jsonwebtoken_1.default.sign({ id: _id }, this.JWT_ACCESS_KEY, {
                expiresIn: "5h",
            });
            const refreshToken = yield jsonwebtoken_1.default.sign({ id: _id }, this.JWT_REFRESH_KEY, {
                expiresIn: "3d",
            });
            return { accessToken, refreshToken };
        });
    }
    // ***************************************************************************************
    verifyJwt(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield jsonwebtoken_1.default.verify(token, this.JWT_VERIFICATION_KEY));
        });
    }
    // ***************************************************************************************
    forgotPasswordToken(userId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield jsonwebtoken_1.default.sign({ userId: userId, email: email }, this.JWT_VERIFICATION_KEY, {
                expiresIn: "10m",
            });
            return token;
        });
    }
}
exports.JWTtoken = JWTtoken;
//# sourceMappingURL=jwt.js.map