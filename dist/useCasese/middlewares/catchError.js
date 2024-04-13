"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = void 0;
const errorHandler_1 = __importDefault(require("./errorHandler"));
const catchError = (error, next) => {
    let message;
    if (error instanceof Error) {
        message = error.message;
    }
    else if (error && typeof error === "object" && "message" in error) {
        message = String(error.message); // value in the message property could be any type but doing this way we are doing the type casting
    }
    else if (typeof error === "string") {
        message = error;
    }
    else {
        message = "unknown error";
    }
    return next(new errorHandler_1.default(500, message));
};
exports.catchError = catchError;
//# sourceMappingURL=catchError.js.map