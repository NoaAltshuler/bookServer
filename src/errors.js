class HttpError extends Error {
    constructor(message,code) {
      super(message);
      this.code = code;
    }
  }
export class ConflictError extends HttpError {
    constructor(message) {
      super(message,409);
    }
  }

  export class BadRequestError extends HttpError {
    constructor(message) {
      super(message,400);
    }
  }
  
  export class NotFoundError extends HttpError {
    constructor(message) {
      super(message,404);
    }
  }
   