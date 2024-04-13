export interface ICreateOtp {
    generateOTP(): Promise<string>;
}
