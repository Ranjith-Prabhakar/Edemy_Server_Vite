import { IReviewAndRatingRepository } from "../../../useCasese/interface/repository/reviewAndRatingRepository";
import { IReviewAndRatingReq, IReviewAndRatingResponse } from "../../../useCasese/interface/request_And_Response/reviewAndRatingResponse";
export declare class ReviewAndRatingRepository implements IReviewAndRatingRepository {
    updateReviewAndRating(reviewAndRating: IReviewAndRatingReq): Promise<void | IReviewAndRatingResponse>;
    getSingleCourseReviewAndRating(courseId: string): Promise<void | IReviewAndRatingResponse>;
}
