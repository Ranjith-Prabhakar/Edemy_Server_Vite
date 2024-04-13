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
exports.PaymentRepository = void 0;
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
class PaymentRepository {
    createCollection(paymentData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield paymentModel_1.default.create(Object.assign(Object.assign({}, paymentData), { userId }));
                if (result)
                    return true;
                return false;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAndDelete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("findAndDelete payment repo engine userId", userId);
                const result = (yield paymentModel_1.default.findOneAndDelete({ userId }));
                console.log("result", result);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.PaymentRepository = PaymentRepository;
//# sourceMappingURL=paymentRepository.js.map