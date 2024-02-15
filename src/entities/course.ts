interface Questions {
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
  moduleNo: number;
  moduleTittle:string,
  duration: number;
  questions: Questions;
}

export interface IReviewRating{
  userId:string;
  review:string;
  rating:number
}


export interface ICourse {
  name: string;
  instructor: string;
  description: string;
  tags: string[];
  thumbnail: string;
  uplaoadedDate: Date;
  status: "approved" | "pending" | "freez";
  duration: number;
  modules: Array<IModule>;
  review: Array<IReviewRating>;
  rating: number;
  submissionStatus: "work-in-progress" | "completed";
}
