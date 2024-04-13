"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorHandler_1 = __importDefault(require("./errorHandler"));
const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";
    console.log("inside error middleware");
    console.error(err);
    //wrong mongoDb id
    if (err.name === "castError") {
        const message = `Resource not found, invalid:${err.path}`;
        err = new errorHandler_1.default(400, message);
    }
    //duplicate key error =>for authentication
    if (err.name === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new errorHandler_1.default(400, message);
    }
    //wrong jwt error
    if (err.name === "jsonWebTokenError") {
        const message = `json web token is invalid,try again`;
        err = new errorHandler_1.default(400, message);
    }
    //token expired error
    if (err.name === "TokenExpiredError") {
        const message = `json web token has expired`;
        err = new errorHandler_1.default(400, message);
    }
    // if (err instanceof ErrorResponse) {
    //   res.status(err.statusCode).json({
    //     success: false,
    //     status: err.statusCode,
    //     message: err.message,
    //   });
    // }
    res.status(err.statusCode).json({
        status: err.statusCode,
        success: false,
        message: err.message,
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map