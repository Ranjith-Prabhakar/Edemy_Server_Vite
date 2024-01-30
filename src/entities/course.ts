export interface ICourse {
  name: string;
  tags: string[];
  thumbnail: string;
  uplaoadedDate: Date;
  status: "approved" | "pending" | "freez";
  duration: number;
}
