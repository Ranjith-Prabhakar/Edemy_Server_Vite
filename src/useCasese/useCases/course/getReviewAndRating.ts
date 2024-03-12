import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IReviewAndRatingRepository } from "../../interface/repository/reviewAndRatingRepository";
import { IReviewAndRatingResponse } from "../../interface/request_And_Response/reviewAndRatingResponse";
import { catchError } from "../../middlewares/catchError";

export const getReviewAndRating = async (
  reviewAndRatingRepository: IReviewAndRatingRepository,
  req: Req,
  next: Next
): Promise<void | IReviewAndRatingResponse> => {
  try {
    return await reviewAndRatingRepository.getReviewAndRating()
  } catch (error) {
    catchError(error,next)
  }
};
