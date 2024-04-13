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
exports.existCategory = void 0;
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const existCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield categoryModel_1.default.findOne({ name: category });
        console.log("inside repo", result);
        if (result) {
            return "exist";
        }
        else {
            return "not exist";
        }
    }
    catch (error) {
        throw error;
    }
});
exports.existCategory = existCategory;
//# sourceMappingURL=existCategory.js.map