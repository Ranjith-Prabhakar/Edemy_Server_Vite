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
const mongoose_1 = __importDefault(require("mongoose"));
const otpSchema = new mongoose_1.default.Schema({
    email: String,
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 30 * 60,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
// delete the document after a certain time
otpSchema.post("save", function (doc) {
    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedDoc = yield OTP.findByIdAndDelete(doc._id);
            if (!deletedDoc) {
                console.error("Document not found");
            }
            else {
                console.log(`Document deleted: ${deletedDoc}`);
            }
        }
        catch (err) {
            console.error(`Error deleting document: ${err}`);
        }
    }), 30 * 60 * 1000);
});
const OTP = mongoose_1.default.model("OTP", otpSchema);
exports.default = OTP;
//# sourceMappingURL=otp.model.js.map