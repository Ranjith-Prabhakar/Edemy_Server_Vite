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
exports.AdminUseCase = void 0;
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
const index_1 = require("./admin/index");
const StaticClassProperty_1 = require("../staticClassProperty/StaticClassProperty");
const notification_1 = require("../../entities/notification");
class AdminUseCase {
    constructor(userRepository, instrctorAgreementRepository, categoryRepository, notificationRepository) {
        this.userRepository = userRepository;
        this.instrctorAgreementRepository = instrctorAgreementRepository;
        this.categoryRepository = categoryRepository;
        this.notificationRepository = notificationRepository;
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    approveOrRejectInstructor(req, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                const result = yield (0, index_1.approveOrRejectInstructor)(this.userRepository, this.instrctorAgreementRepository, req, next);
                // have to check whethere approve or not (but not done it now )
                console.log("######", (_a = req.user) === null || _a === void 0 ? void 0 : _a._id, notification_1.ENotification.instructorRequestApproval);
                const notificationRepoUpdate = yield this.notificationRepository.addNotification(userId, notification_1.ENotification.instructorRequestApproval);
                if (notificationRepoUpdate) {
                    StaticClassProperty_1.SocketClass.SocketUsers[userId].emit("fromServerInstrctorRequestApproval", "Your request for being instructor has been approved");
                }
                return result;
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    instructorRequests(next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.instructorRequests)(this.instrctorAgreementRepository, next);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getUsers(next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getUsers)(this.userRepository, next);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getUser(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getUser)(this.userRepository, req, next);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    freezUser(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (0, index_1.freezUser)(this.userRepository, req, next);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    unFreezUser(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (0, index_1.unFreezUser)(this.userRepository, req, next);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getInstructors(next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getInstructors)(this.userRepository, next);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    addCategory(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.addCategory)(this.categoryRepository, req, next);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getCategories(next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getCategories)(this.categoryRepository, next);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    freezCategory(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.freezCategory)(req, next, this.categoryRepository);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    unFreezCategory(req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.unFreezCategory)(req, next, this.categoryRepository);
            }
            catch (error) {
                return next(new errorHandler_1.default(500, error.message));
            }
        });
    }
}
exports.AdminUseCase = AdminUseCase;
//# sourceMappingURL=adminUseCase.js.map