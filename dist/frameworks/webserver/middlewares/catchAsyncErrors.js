"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsyncErrors = void 0;
const catchAsyncErrors = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
};
exports.catchAsyncErrors = catchAsyncErrors;
//# sourceMappingURL=catchAsyncErrors.js.map