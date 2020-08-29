/* eslint-disable comma-dangle */
// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express';

const apiKeyMiddleware = (
  request: Request,
  response: Response,
  nextFunction: NextFunction
) => {
  const apiKeyHeader = request.headers['x-api-key'];

  if (apiKeyHeader !== process.env.X_API_KEY) {
    return response.status(403).json({ message: 'Invalid api token' });
  }

  nextFunction();
};

export { apiKeyMiddleware };
