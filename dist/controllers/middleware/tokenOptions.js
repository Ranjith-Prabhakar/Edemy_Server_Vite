"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenOptions = exports.accessTokenOptions = void 0;
const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10);
const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1200", 10);
let accessTokenProductionMode = process.env.NODE_ENV === "production" ? true : false;
// options for cookies
exports.accessTokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000), //5 hour
    maxAge: accessTokenExpire * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: accessTokenProductionMode,
};
exports.refreshTokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000), // 3 days
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
};
//# sourceMappingURL=tokenOptions.js.map