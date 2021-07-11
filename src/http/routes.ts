import { Router } from 'express';

/* Controllers */
import { userController } from './controllers/user.controller';

/* Routes for endoints */
export const mountRoutes = () => {
  const router = Router()
  router.use('/user', userController());
  return router;
}
