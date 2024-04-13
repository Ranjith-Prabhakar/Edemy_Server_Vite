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
exports.approveOrRejectInstructor = void 0;
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const approveOrRejectInstructor = (userRepository, instrctorAgreementRepository, req, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.action === "approved") {
            const result = yield instrctorAgreementRepository.updateStatus(req.body.agreementId, "approved");
            if (result.status === (500 | 404)) {
                return result;
            }
            else {
                yield userRepository.findAndUpdate(req.body);
                console.log("userData", req.body);
                return result;
            }
        }
        else {
            const result = yield instrctorAgreementRepository.updateStatus(req.body.userId, "rejected");
            return result;
        }
    }
    catch (error) {
        throw next(new errorHandler_1.default(500, error.message));
    }
});
exports.approveOrRejectInstructor = approveOrRejectInstructor;
//# sourceMappingURL=approveOrRejectInstructor.js.map