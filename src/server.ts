import './bootstrap';
import express from 'express';
import { routes } from './routes';

const PORT = process.env.SERVER_PORT || 8000;

const startServer = () => {
  const app: express.Application = express();

  const applyMiddlewares = () => {
    app.use(express.json());
  };

  const applyRoutes = () => {
    app.use(routes);
  };

  applyMiddlewares();
  applyRoutes();

  app.listen(PORT, () => {
    console.log('\nServer running on port: ', PORT);
  });
};

startServer();
