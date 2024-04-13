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
exports.autheriseRoles = exports.isAuthenticated = void 0;
const errorHandler_1 = require("../../../useCasese/middlewares/errorHandler");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../../../index");
require("dotenv").config();
//authenticated user
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    if (!accessToken || !refreshToken) {
        console.log("no accessToken || refreshToken");
        return next(new errorHandler_1.ErrorHandler(400, "please login to  use this resource"));
    }
    // const decodedPayload = jwt.decode(accessToken);
    const decode = (yield jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_KEY));
    if (!decode) {
        return next(new errorHandler_1.ErrorHandler(400, "Access Token is invalid"));
    }
    const user = yield index_1.redis.get(decode.id);
    if (!user) {
        console.log("no user session");
        return next(new errorHandler_1.ErrorHandler(400, "please login to use this resource"));
    }
    req.user = JSON.parse(user);
    console.log("success from isAuth");
    next();
});
exports.isAuthenticated = isAuthenticated;
//validate user role
const autheriseRoles = (...roles) => {
    return (req, res, next) => {
        var _a, _b;
        if (!roles.includes(((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) || "")) {
            return next(new errorHandler_1.ErrorHandler(401, `role:${(_b = req.user) === null || _b === void 0 ? void 0 : _b.role} is not allowed to use this resource`));
        }
        next();
    };
};
exports.autheriseRoles = autheriseRoles;
//# sourceMappingURL=auth.js.map