import { ExpressMiddlewareInterface, HttpError, Middleware } from "routing-controllers";
import { NextFunction, Request, Response } from "express";

@Middleware({ type: "after" })
export class DefaultErrorHandler implements ExpressMiddlewareInterface {
  error(error: any, request: Request, response: Response, next: NextFunction) {
    if (error instanceof HttpError) {
      if (error.httpCode < 500) {
        console.error(error.message);
        return next();
      }
    }

    console.error(error);
    next();
  }
}