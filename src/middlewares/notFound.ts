/* eslint-disable comma-dangle */
// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express';

const notFoundMiddleware = (
  request: Request,
  response: Response,
  // eslint-disable-next-line no-unused-vars
  nextFunction: NextFunction
) => {
  response.status(404);
  response.redirect('/');
};

export { notFoundMiddleware };
