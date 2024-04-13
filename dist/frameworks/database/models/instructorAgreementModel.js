"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const instrctorAgreementSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        unique: true,
    },
    userName: {
        type: String,
        required: [true, "please give the name"],
    },
    status: {
        type: String,
        default: "pending",
    },
    qualification: String,
    consent: { type: Boolean, default: true },
    contract: {
        type: String,
        default: `you are responsible to provide quality education, adhere to the platform's guidelines,
       maintain professionalism, engage students effectively, and continuously improve your 
       teaching methods for an enriching e-learning experience.
        tutor agrees to a revenue-sharing model of 30/70, where the tutor receives 70%
         of the income generated, and the platform retains 30%, as specified in our terms and conditions
       `,
    },
    certificate: {
        type: String,
        required: [true, "please give the name"],
    },
});
const instructorAgreementModel = mongoose_1.default.model("instructor_agreement", instrctorAgreementSchema);
exports.default = instructorAgreementModel;
//# sourceMappingURL=instructorAgreementModel.js.map