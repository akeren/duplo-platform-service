import request from 'supertest';
import { app } from '../app';

describe('Create Order', () => {
	const createOrderEndpoint = `/api/v1/orders`;

	it('is order created successfully', async () => {
		const response = await request(app).post(createOrderEndpoint).send({
			businessId: '653ba541c15cb14931e49e87',
			amount: 3000,
			status: 'completed'
		});
	});
});
