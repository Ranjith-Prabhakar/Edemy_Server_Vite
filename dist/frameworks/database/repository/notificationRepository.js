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
exports.NotificationRepository = void 0;
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
class NotificationRepository {
    addNotification(userId, key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("key,userid,value", key, userId, value);
                if (value) {
                    console.log("inside value", value);
                    // if the field to update is new course updates for every user
                    const result = yield notificationModel_1.default.findOneAndUpdate({ userId }, { $addToSet: { [key]: value } });
                    if (result)
                        return true;
                    else
                        false;
                }
                else {
                    console.log("inside no value");
                    const result = yield notificationModel_1.default.findOneAndUpdate({ userId }, { [key]: true }, { upsert: true, new: true });
                    console.log("inside no value result", result);
                    if (result)
                        return true;
                    else
                        false;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    //
    getNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield notificationModel_1.default.findOne({ userId });
                if (result) {
                    return {
                        success: true,
                        message: "notifications has found",
                        data: result,
                    };
                }
                else {
                    return {
                        success: false,
                        message: "there is no notifications",
                    };
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    //
    updateNotifications(notificationHead, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield notificationModel_1.default.updateOne({ userId: userId }, { $set: { [notificationHead]: false } });
                if (result) {
                    return { success: true, message: "notification has been updated" };
                }
                else {
                    return { success: false, message: "notification hasn`t been updated" };
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.NotificationRepository = NotificationRepository;
//# sourceMappingURL=notificationRepository.js.map