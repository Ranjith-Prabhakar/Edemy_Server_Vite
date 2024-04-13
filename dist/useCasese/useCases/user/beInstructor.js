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
exports.beInstructor = void 0;
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const StaticClassProperty_1 = require("../../staticClassProperty/StaticClassProperty");
const notification_1 = require("../../../entities/notification");
const beInstructor = (instructorAgreementRepository, userRepository, notificationRepository, req, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const result = yield instructorAgreementRepository.createAgreement(Object.assign({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id, userName: (_b = req.user) === null || _b === void 0 ? void 0 : _b.name }, req.body));
        console.log("result instructorAgreementRepository", result);
        if (result.agreement) {
            const admin = yield userRepository.getAdmin();
            const notificationRepoResult = yield notificationRepository.addNotification(admin === null || admin === void 0 ? void 0 : admin._id, notification_1.ENotification.instructorRequests);
            console.log("notificationRepoResult", notificationRepoResult);
            if (notificationRepoResult) {
                if (admin) {
                    const adminSocket = StaticClassProperty_1.SocketClass.SocketUsers[admin._id];
                    adminSocket.emit("fromServerInstructorRequestSubmitted", result.agreement);
                }
            }
        }
        return result;
    }
    catch (error) {
        return next(new errorHandler_1.default(500, error.message));
    }
});
exports.beInstructor = beInstructor;
//# sourceMappingURL=beInstructor.js.map