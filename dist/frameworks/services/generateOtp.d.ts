import { ICreateOtp } from "../../useCasese/interface/services/createOtp";
export declare class GenerateOtp implements ICreateOtp {
    generateOTP(): Promise<string>;
}
