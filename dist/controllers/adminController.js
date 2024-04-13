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
exports.AdminController = void 0;
const errorHandler_1 = __importDefault(require("../useCasese/middlewares/errorHandler"));
const inputValidation_1 = require("./middleware/inputValidation");
class AdminController {
    constructor(adminUseCase) {
        this.adminUseCase = adminUseCase;
    }
    // *****************************************************************************************************************************
    approveOrRejectInstructor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "approveInstructor", next);
                const result = yield this.adminUseCase.approveOrRejectInstructor(req, next);
                res.status(result.status).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    instructorRequests(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.adminUseCase.instructorRequests(next);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.adminUseCase.getUsers(next);
                console.log("result", result);
                res.status(200).json({
                    success: true,
                    message: "users have been fetched successfully ",
                    data: result,
                });
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.adminUseCase.getUser(req, next);
                console.log("admin controller getUser", result);
                res.status(200).json({
                    success: true,
                    message: "user have been fetched successfully",
                    user: result,
                });
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    freezUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.adminUseCase.freezUser(req, next);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    unFreezUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.adminUseCase.unFreezUser(req, next);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    getInstructors(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.adminUseCase.getInstructors(next);
                console.log("admin controller getUser", result);
                res.status(200).json({
                    success: true,
                    message: "instructors have been fetched successfully",
                    data: result,
                });
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    addCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, inputValidation_1.inputValidation)(req, "addCategory", next);
                const result = yield this.adminUseCase.addCategory(req, next);
                console.log("addCategory controller", result);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    getCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.adminUseCase.getCategories(next);
                res.status(200).json({
                    success: true,
                    message: "data fetched successfully",
                    data: result,
                });
                console.log("reachig here inside of controller", result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    freezCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.adminUseCase.freezCategory(req, next);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // *****************************************************************************************************************************
    unFreezCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.adminUseCase.unFreezCategory(req, next);
                res.status(200).json(result);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=adminController.js.map