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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReviewAndRating = void 0;
const catchError_1 = require("../../middlewares/catchError");
const updateReviewAndRating = (reviewAndRatingRepository, req, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const reviewAndRating = {
            courseId: req.body.courseId,
            courseName: req.body.courseName,
            reviewAndRating: {
                userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
                userName: (_b = req.user) === null || _b === void 0 ? void 0 : _b.name,
                [req.body.fieldToUpdate]: req.body[req.body.fieldToUpdate],
            },
        };
        console.log("reviewAndRatingRepository engine reviewAndRating", reviewAndRating);
        const result = yield reviewAndRatingRepository.updateReviewAndRating(reviewAndRating);
        console.log("reviewAndRatingRepository engine result", result);
        return result;
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
});
exports.updateReviewAndRating = updateReviewAndRating;
//# sourceMappingURL=updateReviewAndRating.js.map