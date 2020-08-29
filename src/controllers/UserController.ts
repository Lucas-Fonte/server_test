/* eslint-disable object-curly-newline */
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
// eslint-disable-next-line no-unused-vars
import { UserSessionRequest } from '../middlewares/auth';
import { createUser } from '../core/User/createUser';
import { signUser } from '../core/User/signUser';
import { searchUser } from '../core/User/searchUser';

const UserController = {
  signIn: async (request: Request, response: Response) => {
    try {
      const { code, ...content } = await signUser(request.body);
      return response.status(code).json({ ...content });
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  },
  signUp: async (request: Request, response: Response) => {
    try {
      const { code, ...content } = await createUser(request.body);
      return response.status(code).json({ ...content });
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  },
  search: async (request: UserSessionRequest, response: Response) => {
    try {
      if (request.userId !== request.params.userId) {
        return response.status(401).json({ error: 'token invalid' });
      }
      const { code, ...content } = await searchUser(request.params.userId);
      return response.status(code).json({ ...content });
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  },
};

export { UserController };
