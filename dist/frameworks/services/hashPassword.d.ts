import { IHashpassword } from '../../useCasese/interface/services/hashPassword';
export declare class Encrypt implements IHashpassword {
    constructor();
    createHash(password: string): Promise<string>;
    comparePassword(password: string, hashPassword: string): Promise<boolean>;
}
