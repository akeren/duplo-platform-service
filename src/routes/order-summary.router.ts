import { Router } from 'express';
import { orderSummaryHandler } from '../controller';

const router: Router = Router();

router.get('/:businessId/order-summary', orderSummaryHandler);

export { router as orderSummaryRouter };
