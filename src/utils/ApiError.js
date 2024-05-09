class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something Went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.errors = errors;
    this.stack = stack;
    this.sucsess = false;

    if(stack){
        this.stack=stack;
    }
    else{
        Error.captureStackTrace(this, this.constructor);
    }
  }
}

export {ApiError}
