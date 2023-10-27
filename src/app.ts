import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { NotFoundError } from './errors';
import { errorHandler } from './middleware';
import {
	createOrderRouter,
	creditScoreRouter,
	orderSummaryRouter
} from './routes';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true);

app.use(cors());
app.use(helmet());

app.use('/api/v1/orders', createOrderRouter);
app.use('/api/v1/business', creditScoreRouter);
app.use('/api/v1/business/', orderSummaryRouter);

app.all('*', async (req: Request, res: Response): Promise<void> => {
	throw new NotFoundError(`Can't find ${req.originalUrl} on this Server!`);
});

app.use(errorHandler);

export { app };
