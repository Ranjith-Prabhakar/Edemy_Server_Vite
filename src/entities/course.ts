interface IQuestions {
  userId: string;
  question: string;
  answers: [
    {
      userId: string;
      answer: string;
      upvote: number;
    }
  ];
}

export interface IModule {
  moduleNo: string;
  moduleTittle: string;
  videos: [
    {
      videoNo: string;
      videoTittle: string;
      videoUrl: string;
      duration?: string;
      finished?: boolean;
      currentPosition?: number;
      questions?: Array<IQuestions>;
    }
  ];
}

export interface IReviewRating {
  userId: string;
  review: string;
  rating: number;
}

export interface ICourse {
  category:string;
  courseName: string;
  instructor: string;
  discription: string;
  tags: string;
  thumbnail: string;
  uplaoadedDate: Date;
  status: "approved" | "pending" | "freez" | "rejected";
  duration: string;
  modules: Array<IModule>;
  review: Array<IReviewRating>;
  rating: number;
  submissionStatus: "work-in-progress" | "completed";
  noOfPurchase:number
}