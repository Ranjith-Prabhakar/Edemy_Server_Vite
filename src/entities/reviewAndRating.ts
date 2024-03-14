import { TDocumentId } from "../frameworks/types/dbTypes";
export interface IReviewAndRatingArrayData {
  userId: string;
  userName: string;
  date: Date;
  review?: string;
  rating?: number;
}

export interface IReviewAndRating {
  _id: TDocumentId;
  courseId: string;
  courseName: string;
  reviewAndRating: IReviewAndRatingArrayData[];
}
