export interface IPaymentRespose {
    status: number;
    message: string;
    data?: string;
}
export type TPaymentRequest = {
    courseId: string;
    courseName: string;
    price: string;
}[];
