import express from 'express';

import { mountRoutes } from './routes'

export const setupExpressApp = async () => {
  // setup express app
  const app = express();

  // Mount endoints routes
  app.use('/api', mountRoutes());

  return app;
}
