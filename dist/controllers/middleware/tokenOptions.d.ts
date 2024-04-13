interface ITokenOptions {
    expires: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: "lax" | "strict" | "none" | undefined;
    secure?: boolean;
}
export declare const accessTokenOptions: ITokenOptions;
export declare const refreshTokenOptions: ITokenOptions;
export {};
