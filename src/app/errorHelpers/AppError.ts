class AppError extends Error {
  public statusCode: number;
  constructor(statusCode: number, messasge: string, stack = "") {
    super(messasge);
    this.statusCode = statusCode;
    
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
