import { Router } from 'express';
import { success } from '../../utils/response';

// controller for user endpoint
export const userController = () => {
  const router = Router();

  router.get('', (_: TRequest, res: TResponse) => {
    return success(res, 'Get users', 200);
  });

  return router;
};
