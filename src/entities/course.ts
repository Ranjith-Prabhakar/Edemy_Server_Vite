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

interface Module {
  moduleNo: number;
  moduleTittle:string,
  duration: number;
  questions: Questions;
}

interface ReviewRating{
  userId:string;
  review:string;
  rating:number
}


export interface ICourse {
  name: string;
  instructor: string;
  description:string;
  tags: string[];
  thumbnail: string;
  uplaoadedDate: Date;
  status: "approved" | "pending" | "freez";
  duration: number;
  modules: Array<Module>;
  review: Array<ReviewRating>;
  rating: number
}
