import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IReviewAndRatingRepository } from "../../interface/repository/reviewAndRatingRepository";
import { IReviewAndRatingResponse } from "../../interface/request_And_Response/reviewAndRatingResponse";
export declare const getSingleCourseReviewAndRating: (reviewAndRatingRepository: IReviewAndRatingRepository, req: Req, next: Next) => Promise<void | IReviewAndRatingResponse>;
