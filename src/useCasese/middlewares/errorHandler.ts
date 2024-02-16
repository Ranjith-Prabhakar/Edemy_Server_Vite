export class ErrorHandler extends Error {
  statusCode: number;
  constructor(statusCode: number,message: any) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  // static badRequest(msg: string): ErrorHandler {
  //   return new ErrorHandler(400, msg);
  // }

  // static unauthorized(msg: string): ErrorHandler {
  //   return new ErrorHandler(401, msg);
  // }

  // static forbidden(msg: string): ErrorHandler {
  //   return new ErrorHandler(403, msg);
  // }

  // static notFound(msg: string = "Not found"): ErrorHandler {
  //   return new ErrorHandler(404, msg);
  // }

  // static internalError(msg: string): ErrorHandler {
  //   return new ErrorHandler(500, msg);
  // }
}

export default ErrorHandler;
