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
exports.findByIdAndUpdate = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const findByIdAndUpdate = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userModel_1.default.findByIdAndUpdate(id, data, { new: true });
    if (result) {
        return {
            status: 200,
            success: true,
            message: "user password has been updated",
        };
    }
    else {
        return {
            status: 400,
            success: false,
            message: "user not found",
        };
    }
});
exports.findByIdAndUpdate = findByIdAndUpdate;
//# sourceMappingURL=findByIdAndUpdate.js.map