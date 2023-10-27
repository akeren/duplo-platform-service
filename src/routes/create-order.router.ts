import { Router } from 'express';
import { validateRequest } from '../middleware';
import { createOrderRequest } from '../validation';
import { createOrderHandler } from '../controller';

const router: Router = Router();

router.post('/', createOrderRequest, validateRequest, createOrderHandler);

export { router as createOrderRouter };
