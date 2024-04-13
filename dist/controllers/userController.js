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
exports.UserController = void 0;
const inputValidation_1 = require("./middleware/inputValidation");
const tokenOptions_1 = require("./middleware/tokenOptions");
const errorHandler_1 = __importDefault(require("../useCasese/middlewares/errorHandler"));
class UserController {
    constructor(userUseCase) {
        this.userUseCase = userUseCase;
    }
    // *****************************************************************************************************************************
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "registerUser", next);
                const token = yield this.userUseCase.registerUser(req.body, next);
                res.cookie("verificationToken", token, {
                    httpOnly: true,
                    sameSite: "strict",
                    expires: new Date(Date.now() + 30 * 60 * 1000),
                });
                res.status(200).json({
                    success: true,
                    message: "verification otp has been sent the mail",
                });
            }
            catch (error) {
                return next(new errorHandler_1.default(error.status, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "verifyUser", next);
                let token = req.cookies.verificationToken;
                const result = yield this.userUseCase.createUser(req.body.verificationCode, token, next);
                res.clearCookie("verificationToken").send(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "login", next);
                const result = yield this.userUseCase.login(req.body, next);
                res.cookie("accessToken", result === null || result === void 0 ? void 0 : result.tokens.accessToken, tokenOptions_1.accessTokenOptions);
                res.cookie("refreshToken", result === null || result === void 0 ? void 0 : result.tokens.accessToken, tokenOptions_1.refreshTokenOptions);
                res
                    .status(200)
                    .json({ user: result === null || result === void 0 ? void 0 : result.user, message: "user loggedIn successfully" });
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userUseCase.logout(req, res, next);
                res.status(200).json({
                    success: true,
                    message: "user has been loged out successfully",
                });
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (yield this.userUseCase.refresh(req, res, next));
                res.cookie("accessToken", result.accessToken, tokenOptions_1.accessTokenOptions);
                res.cookie("refreshToken", result.refreshToken, tokenOptions_1.refreshTokenOptions);
                res.status(200).json({ success: true, message: "tokens are updated" });
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    beInstructor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "beInstructor", next);
                const result = (yield this.userUseCase.beInstructor(req, next));
                console.log("after fetch controll", result);
                res.status(result.status).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("forgotPassword controller time===>", req.body, Date.now());
                yield (0, inputValidation_1.inputValidation)(req, "forgotPassword", next);
                const result = yield this.userUseCase.forgotPassword(req, next);
                res.cookie("verificationToken", result, {
                    sameSite: "strict",
                    httpOnly: true,
                    maxAge: 5 * 60 * 1000,
                });
                res.status(200).json({
                    succuss: true,
                    message: "verification code has been sent to your account",
                });
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    forgotPasswordOtpVerification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "forgotPasswordOtpVerification", next);
                const token = req.cookies.verificationToken;
                console.log("token", token);
                let result = yield this.userUseCase.forgotPasswordOtpVerification(req, next, token);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    resetForgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("req.body", req.body);
                yield (0, inputValidation_1.inputValidation)(req, "resetForgotPassword", next);
                console.log("req.body after validation");
                let token = req.cookies.verificationToken;
                const result = yield this.userUseCase.resetForgotPassword(req, token, next);
                res.clearCookie("verificationToken");
                res.status(200).send(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    userSession(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("userSession result");
                const result = yield this.userUseCase.userSession(req, next);
                console.log("userSession result", result);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    getNotifications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("getNotifications result");
                const result = yield this.userUseCase.getNotifications(req, next);
                console.log("getNotifications result", result);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    updateNotifications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("updateNotifications result", req.body);
                const result = yield this.userUseCase.updateNotifications(req, next);
                console.log("getNotifications result", result);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map