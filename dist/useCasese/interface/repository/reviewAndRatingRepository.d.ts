import { IReviewAndRatingReq, IReviewAndRatingResponse } from '../request_And_Response/reviewAndRatingResponse';
export interface IReviewAndRatingRepository {
    updateReviewAndRating(reviewAndRating: IReviewAndRatingReq): Promise<IReviewAndRatingResponse | void>;
    getSingleCourseReviewAndRating(courseId: string): Promise<IReviewAndRatingResponse | void>;
}
