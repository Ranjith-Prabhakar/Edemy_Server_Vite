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
  courseName: string;
  instructor: string;
  discription: string;
  tags: string[];
  thumbnail: string;
  uplaoadedDate: Date;
  status: "approved" | "pending" | "freez";
  duration: string;
  modules: Array<IModule>;
  review: Array<IReviewRating>;
  rating: number;
  submissionStatus: "work-in-progress" | "completed";
}
