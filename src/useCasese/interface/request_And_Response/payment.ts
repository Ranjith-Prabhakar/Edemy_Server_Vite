export interface IPaymentRespose {
  status: number;
  message: string;
  data?: string;
}

export type TPaymentRequest = { courseName: string; price: string }[];

