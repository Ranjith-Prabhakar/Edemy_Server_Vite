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
exports.inputValidation = void 0;
const errorHandler_1 = __importDefault(require("../../useCasese/middlewares/errorHandler"));
// Mail format
const mailValidation = (email) => {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
// Password complexity check
const isStrongPassword = (password) => {
    // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return passwordRegex.test(password);
};
const inputValidation = (req, route, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Trim and validate required fields
    for (let prop in req.body) {
        if (req.body.hasOwnProperty(prop)) {
            //by this it will avoid the trim application on any prototype chained props
            // trim and update the value
            if (typeof req.body[prop] === "string") {
                req.body[prop] = req.body[prop].trim();
                // empty space checking
                if (!req.body[prop]) {
                    return next(new errorHandler_1.default(400, "required fields are missing"));
                }
                if (prop === "email") {
                    if (!mailValidation(req.body[prop])) {
                        return next(new errorHandler_1.default(400, "Invalid email format"));
                    }
                }
                if (prop === "password") {
                    console.log("prop === password", prop, typeof req.body[prop]);
                    console.log("prop === password", req.body[prop].length);
                    // Validate password length and complexity
                    if (req.body[prop].length < 8 || !isStrongPassword(req.body[prop])) {
                        return next(new errorHandler_1.default(400, "Password does not meet complexity requirements"));
                    }
                }
            }
        }
    }
    // Additional validations based on the route
    switch (route) {
        case "registerUser":
            let { name, password, confirmPassword } = req.body;
            // Validate name length
            if (name.length < 3) {
                return next(new errorHandler_1.default(400, "give a name with valid width"));
            }
            // Confirm password matching
            if (password !== confirmPassword) {
                return next(new errorHandler_1.default(400, "Password mismatches"));
            }
            break;
        // ------------------------------------------------------------
        case "verifyUser":
            if (req.body.verificationCode.length !== 4) {
                return next(new errorHandler_1.default(400, "verification code should be four digits"));
            }
            break;
        //----------------------------------------------------------------------
        case "forgotPasswordOtpVerification":
            if (req.body.verificationCode.length !== 4) {
                return next(new errorHandler_1.default(400, "verification code should be four digits"));
            }
            break;
        default:
            return true;
    }
});
exports.inputValidation = inputValidation;
//# sourceMappingURL=inputValidation.js.map