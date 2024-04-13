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
exports.ReviewAndRatingRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reviewAndRatingModel_1 = __importDefault(require("../models/reviewAndRatingModel"));
class ReviewAndRatingRepository {
    updateReviewAndRating(reviewAndRating) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //check whether the course is already in this collection
                const isExist = yield reviewAndRatingModel_1.default.findOne({
                    courseId: reviewAndRating.courseId,
                });
                console.log("updateReviewAndRating repo isExist", isExist, reviewAndRating.courseId);
                if (isExist) {
                    //check whether the user alrady made any rating or review then we will update it
                    const isUserAlreadyAddedReview = yield reviewAndRatingModel_1.default.findOne({
                        courseId: reviewAndRating.courseId,
                        reviewAndRating: {
                            $elemMatch: { userId: reviewAndRating.reviewAndRating.userId },
                        },
                    });
                    console.log("isUserAlreadyAddedReview ====>>>>>>", isUserAlreadyAddedReview);
                    if (isUserAlreadyAddedReview) {
                        // check whether he has to update the review
                        if (reviewAndRating.reviewAndRating.review) {
                            const updatedReviewAndRating = yield reviewAndRatingModel_1.default.findOneAndUpdate({
                                courseId: reviewAndRating.courseId,
                                "reviewAndRating.userId": reviewAndRating.reviewAndRating.userId,
                            }, {
                                $set: {
                                    "reviewAndRating.$.review": reviewAndRating.reviewAndRating.review,
                                },
                            }, { returnDocument: "after" });
                            return {
                                success: true,
                                message: "new review and rating repo has been created",
                                data: updatedReviewAndRating,
                            };
                        }
                        // check whether he has to update the rating
                        else if (reviewAndRating.reviewAndRating.rating) {
                            const updatedReviewAndRating = yield reviewAndRatingModel_1.default.findOneAndUpdate({
                                courseId: reviewAndRating.courseId,
                                "reviewAndRating.userId": reviewAndRating.reviewAndRating.userId,
                            }, {
                                $set: {
                                    "reviewAndRating.$.rating": reviewAndRating.reviewAndRating.rating,
                                },
                            }, { returnDocument: "after" });
                            return {
                                success: true,
                                message: "new review and rating repo has been created",
                                data: updatedReviewAndRating,
                            };
                        }
                    }
                    else {
                        console.log("inside else_________+++++++", reviewAndRating.reviewAndRating);
                        // if the user made neither rating or review
                        const updatedReviewAndRating = yield reviewAndRatingModel_1.default.findOneAndUpdate({ courseId: reviewAndRating.courseId }, {
                            $addToSet: { reviewAndRating: reviewAndRating.reviewAndRating },
                        }, { returnDocument: "after" });
                        return {
                            success: true,
                            message: "new review and rating repo has been created",
                            data: updatedReviewAndRating,
                        };
                    }
                }
                else {
                    // if the course is not added already
                    const newReviewAndRating = yield reviewAndRatingModel_1.default.create(reviewAndRating);
                    return {
                        success: true,
                        message: "new review and rating repo has been created",
                        data: newReviewAndRating,
                    };
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getSingleCourseReviewAndRating(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("courseId from getSingleCourseReviewAndRating", courseId);
                const objectId = mongoose_1.default.Types.ObjectId.createFromHexString(courseId); // Using mongoose.Types.ObjectId.createFromHexString()
                const result = yield reviewAndRatingModel_1.default.findOne({ courseId: objectId });
                if (result) {
                    return {
                        success: true,
                        message: "Review and ratings are fetched",
                        data: result,
                    };
                }
                else {
                    return {
                        success: false,
                        message: "No review and ratings found for the provided courseId",
                    };
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ReviewAndRatingRepository = ReviewAndRatingRepository;
//# sourceMappingURL=reviewAndRatingRepository.js.map