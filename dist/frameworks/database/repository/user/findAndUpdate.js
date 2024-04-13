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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAndUpdate = void 0;
const findAndUpdate = (data, userModels) => __awaiter(void 0, void 0, void 0, function* () {
    const id = data.userId;
    delete data.userId;
    data === null || data === void 0 ? true : delete data.agreementId;
    const update = yield userModels.findByIdAndUpdate(id, { role: "instructor" }, { new: true });
    if (!update) {
        return {
            status: 404,
            success: false,
            message: "User not found",
        };
    }
    else {
        return {
            status: 200,
            success: true,
            message: "user data updated",
        };
    }
});
exports.findAndUpdate = findAndUpdate;
//# sourceMappingURL=findAndUpdate.js.map