import { AuthService } from '../services/auth.service';

import { Router } from 'express';
import { error, success } from '../../utils/response';

// controller for auth endpoint
export const authController = () => {
  const router = Router();
  const authService = new AuthService();

  router.post('/login', async (req: TRequest, res: TResponse) => {
    const { email, password } = req.body;
    try {
      const result = await authService.login(email, password);
      return success(res, result, 200);
    } catch (e) {
      return error(res, e.message, e.code);
    }
  });

  return router;
};
