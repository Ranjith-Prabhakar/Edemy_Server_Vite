import { IReviewAndRating } from "../../../entities/reviewAndRating";
import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IReviewAndRatingRepository } from "../../interface/repository/reviewAndRatingRepository";
import {
  IReviewAndRatingReq,
  IReviewAndRatingResponse,
} from "../../interface/request_And_Response/reviewAndRatingResponse";
import { catchError } from "../../middlewares/catchError";

export const updateReviewAndRating = async (
  reviewAndRatingRepository: IReviewAndRatingRepository,
  req: Req,
  next: Next
): Promise<void | IReviewAndRatingResponse> => {
  try {
    const reviewAndRating: IReviewAndRatingReq = {
      courseId: req.body.courseId,
      courseName: req.body.courseName,
      reviewAndRating: {
        userId: req.user?._id as string,
        userName: req.user?.name as string,
        [req.body.fieldToUpdate]: req.body[req.body.fieldToUpdate],
      },
    };
    console.log(
      "reviewAndRatingRepository engine reviewAndRating",
      reviewAndRating
    );
    const result = await reviewAndRatingRepository.updateReviewAndRating(
      reviewAndRating
    );
    console.log("reviewAndRatingRepository engine result", result);
    return result;
  } catch (error) {
    catchError(error, next);
  }
};
