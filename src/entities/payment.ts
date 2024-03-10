export interface IPayment {
  _id: string;
  userId: string;
  courseId: string;
  expiresAt?: Date;
  createdAt?: Date;
}
