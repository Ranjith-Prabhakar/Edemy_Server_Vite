import { ISendMail } from '../../useCasese/interface/services/sendMail';
export declare class SendMail implements ISendMail {
    private transporter;
    constructor();
    sendEmailVerification(name: string, email: string, verificationCode: string): Promise<{
        success: boolean;
    }>;
}
