import './bootstrap';
import express from 'express';
import { routes } from './routes';
import { notFoundMiddleware } from './middlewares/notFound';

const PORT = process.env.PORT || 8000;

const startServer = () => {
  const app: express.Application = express();

  const applyStatic = () => {
    app.use('/', express.static('public'));
  };

  const applyMiddlewares = () => {
    app.use(express.json());
  };

  const applyRoutes = () => {
    app.use(routes);
  };

  applyStatic();
  applyMiddlewares();
  applyRoutes();
  app.use(notFoundMiddleware);

  app.listen(PORT, () => {
    console.log('\nServer running on port: ', PORT);
  });
};

startServer();
