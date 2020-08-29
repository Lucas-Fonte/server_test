/* eslint-disable comma-dangle */
// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express';
// eslint-disable-next-line no-unused-vars
import jwt, { SigningKeyCallback } from 'jsonwebtoken';

import { authConfig } from '../config/auth';

interface DecodedUser extends SigningKeyCallback {
  id?: number;
}

export interface UserSessionRequest extends Request {
  userId?: string;
}

const authMiddleware = (
  request: UserSessionRequest,
  response: Response,
  nextFunction: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'token not provided' });
  }

  const [, token] = authHeader.split(' ');

  jwt.verify(token, authConfig.secret, (err, decoded: DecodedUser) => {
    if (err) response.status(401).json({ error: 'token invalid' });
    request.userId = decoded.id.toString();
    nextFunction();
  });
};

export { authMiddleware };
