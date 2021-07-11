import { Router, Request, Response } from 'express';

// controller for user endpoint
export const userController = () => {
  const router = Router();
  router.get('', (req: Request, res: Response) => {
    res.end('Get users');
  });
  return router;
}
