export declare class ErrorHandler extends Error {
    statusCode: number;
    constructor(statusCode: number, message: any);
}
export default ErrorHandler;
