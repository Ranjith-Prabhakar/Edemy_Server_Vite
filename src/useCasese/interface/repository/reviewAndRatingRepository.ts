import { IReviewAndRatingReq, IReviewAndRatingResponse } from '../request_And_Response/reviewAndRatingResponse';

export interface IReviewAndRatingRepository {
  updateReviewAndRating(
    reviewAndRating: IReviewAndRatingReq
  ): Promise<IReviewAndRatingResponse | void>;
  getReviewAndRating(): Promise<IReviewAndRatingResponse | void>;
}