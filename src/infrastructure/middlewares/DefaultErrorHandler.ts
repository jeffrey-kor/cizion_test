import { ExpressMiddlewareInterface, HttpError, Middleware } from "routing-controllers";
import { NextFunction, Request, Response } from "express";

@Middleware({ type: "after" })
export class DefaultErrorHandler implements ExpressMiddlewareInterface {

  use(request: any, response: any, next: (err?: any) => any): any {
    if (request instanceof HttpError) {
      if (request.httpCode < 500) {
        console.error(request.message);
        return next();
      }
    }

    console.error(request);
    next();
  }
}