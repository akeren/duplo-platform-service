import { EntityManager, Repository } from 'typeorm';
import { Order } from '../entity';
import { OrderRepository } from '../repository';
import { NotFoundError } from '../errors';
import { mock, when, anything, instance } from 'ts-mockito';
import { ObjectId } from 'mongodb';

const entityManagerMock = mock<EntityManager>();
const repositoryMock = mock<Repository<Order>>();

const order = new Order({});

order.id = new ObjectId('6495217f5d14cfaceef2d777');
order.amount = 5000;
order.businessId = '688-800hhh';
order.status = 'successful';

const orderRepo = new OrderRepository(
	instance(repositoryMock),
	instance(entityManagerMock)
);

when(entityManagerMock.save(anything())).thenResolve(order);
when(repositoryMock.update(anything(), anything())).thenResolve({
	affected: 1,
	raw: undefined,
	generatedMaps: []
});

describe('OrderRepository', () => {
	it('should create an order', async () => {
		const createdOrder = await orderRepo.create(order);

		expect(createdOrder).toEqual(order);
	});

	it('should update an order amount', async () => {
		const partialEntity = { amount: 4500 };
		const affectedRows = await orderRepo.findOneAndUpdate(order, partialEntity);
		expect(affectedRows).toEqual(1);
	});

	it('should handle an update for a an existing order processed status', async () => {
		const partialEntity = { isProcessed: true };

		try {
			await orderRepo.findOneAndUpdate(order, partialEntity);
		} catch (error) {
			expect(error).toBeInstanceOf(NotFoundError);
		}
	});
});
