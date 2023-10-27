import { Router } from 'express';
import { creditScoreHandler } from '../controller';

const router: Router = Router();

router.route('/:businessId/credit-score').get(creditScoreHandler);

export { router as creditScoreRouter };
