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
exports.OtpRepository = void 0;
const otp_model_1 = __importDefault(require("../models/otp.model"));
class OtpRepository {
    // **************************************************************************************
    createOtpUserCollection(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield otp_model_1.default.create(newUser);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // **************************************************************************************
    findUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield otp_model_1.default.findOne({ email });
            }
            catch (error) {
                throw error;
            }
        });
    }
    // **************************************************************************************
    findAndDeleteUser(email, verificationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield otp_model_1.default.findOneAndDelete({
                    email,
                    otp: verificationCode,
                });
                if (result) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    // **************************************************************************************
    findByMailAndDelete(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield otp_model_1.default.deleteOne({ email: email });
                if (!result) {
                    return false;
                }
                else {
                    return true;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    // **************************************************************************************
    findAndVerifyUser(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield otp_model_1.default.findOne({ email, otp });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.OtpRepository = OtpRepository;
//# sourceMappingURL=otp.repository.js.map