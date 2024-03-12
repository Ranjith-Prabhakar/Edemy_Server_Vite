export interface IReviewAndRatingArrayData {
  userId: string;
  userName: string;
  date: Date;
  review?: string;
  rating?: number;
}

export interface IReviewAndRating {
  _id: string;
  courseId: string;
  courseName: string;
  reviewAndRating: IReviewAndRatingArrayData[];
}
