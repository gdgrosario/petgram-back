import { Router } from 'express';

/* Controllers */
import { userController } from './controllers/user.controller';
import { authController } from './controllers/auth.controller';

/* Routes for endoints */
export const mountRoutes = () => {
  const router = Router();
  router.use('/user', userController());
  router.use('/auth', authController());
  return router;
};
