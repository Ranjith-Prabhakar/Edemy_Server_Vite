"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv").config();
class SendMail {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587"), // if we dont do this the host will show warning
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }
    sendEmailVerification(name, email, verificationCode) {
        return new Promise((resolve, reject) => {
            const mailOptions = {
                from: process.env.SMTP_MAIL,
                to: email,
                subject: 'Edemy Email Verification',
                text: `Hi ${name},\n\n Your Verification Code is ${verificationCode}. Do not share this code with anyone.`,
            };
            this.transporter.sendMail(mailOptions, (err) => {
                if (err) {
                    console.error(err.message);
                    reject({
                        success: false,
                    });
                }
                else {
                    resolve({
                        success: true,
                    });
                }
            });
        });
    }
}
exports.SendMail = SendMail;
//# sourceMappingURL=sendMail.js.map