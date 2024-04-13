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
exports.InstrctorAgreementRepository = void 0;
const instructorAgreementModel_1 = __importDefault(require("../models/instructorAgreementModel"));
class InstrctorAgreementRepository {
    // ******************************************************************************************
    createAgreement(agreement) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isExist = yield instructorAgreementModel_1.default.findOne({
                    userId: agreement.userId,
                });
                if (!isExist) {
                    const result = yield instructorAgreementModel_1.default.create(agreement);
                    return {
                        status: 200,
                        success: true,
                        message: "request has been recorded",
                        agreement: result,
                    };
                }
                else {
                    return {
                        status: 400,
                        success: false,
                        message: "request has been made already and is in processs",
                    };
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    // ******************************************************************************************
    getAgreements() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield instructorAgreementModel_1.default.find({ status: "pending" });
                return {
                    success: true,
                    message: "instructors agreements have been fetched successfully",
                    data: result,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    // ******************************************************************************************
    updateStatus(userId, action) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield instructorAgreementModel_1.default.findByIdAndUpdate(userId, {
                    status: action,
                }, { new: true });
                if (result) {
                    return {
                        status: 200,
                        success: true,
                        message: "status has been updated",
                        data: result,
                    };
                }
                else {
                    return {
                        status: 404,
                        success: true,
                        message: "record not found",
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    success: false,
                    message: "error while fetching data from db",
                };
            }
        });
    }
}
exports.InstrctorAgreementRepository = InstrctorAgreementRepository;
//# sourceMappingURL=instructorAgreementRepository.js.map