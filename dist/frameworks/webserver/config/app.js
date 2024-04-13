"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const errorMiddleware_1 = require("../../../useCasese/middlewares/errorMiddleware");
//routes
const userRoute_1 = require("../routes/userRoute");
const adminRoutes_1 = require("../routes/adminRoutes");
const courseRoute_1 = require("../routes/courseRoute");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: process.env.CLIENT,
    credentials: true,
    methods: ["GET", "PATCH", "PUT", "POST"],
    optionsSuccessStatus: 204,
}));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use("/api/v1/", (0, userRoute_1.userRoute)(express_1.default.Router()));
exports.app.use("/api/v1/admin/", (0, adminRoutes_1.adminRoute)(express_1.default.Router()));
exports.app.use("/api/v1/course/", (0, courseRoute_1.courseRoute)(express_1.default.Router()));
//unknown url
exports.app.all("*", (req, res, next) => {
    const error = new Error(`route ${req.originalUrl} isn't found`);
    error.statusCode = 404;
    next(error);
});
exports.app.use(errorMiddleware_1.errorMiddleware);
//# sourceMappingURL=app.js.map