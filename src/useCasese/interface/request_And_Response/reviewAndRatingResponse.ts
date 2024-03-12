import {
  IReviewAndRating,
  IReviewAndRatingArrayData,
} from "../../../entities/reviewAndRating";

export interface IReviewAndRatingResponse {
  success: boolean;
  message: string;
  data?: IReviewAndRating[] | IReviewAndRating;
}

export interface IReviewAndRatingReq {
  courseId: string;
  courseName: string;
  reviewAndRating: Omit<IReviewAndRatingArrayData, "date">;
}
