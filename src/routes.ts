import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { apiKeyMiddleware } from './middlewares/apiKey';
import { authMiddleware } from './middlewares/auth';

const routes = Router();

routes.use(apiKeyMiddleware);

routes.get('/health', (request, response) => response.json({ health: true }));
routes.post('/users/signIn', UserController.signIn);
routes.post('/users/signUp', UserController.signUp);

routes.use(authMiddleware);

routes.get('/users/:userId', UserController.search);

export { routes };
