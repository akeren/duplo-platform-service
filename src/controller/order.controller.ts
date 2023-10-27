import { Request, Response } from 'express';
import { EntityManager } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Order } from '../entity';
import { OrderRepository } from '../repository';
import { OrderService } from '../service';
import { CreateOrderDto } from '../dto';

const mongoManager = AppDataSource.getMongoRepository(Order);

const orderRepository = new OrderRepository(
	mongoManager,
	new EntityManager(AppDataSource)
);

const orderService = new OrderService(orderRepository);

export async function createOrderHandler(req: Request, res: Response) {
	try {
		const { businessId, amount, status } = req.body;

		const orderDto = new CreateOrderDto(businessId, status, amount);

		const createdOrder = await orderService.create(orderDto);

		await orderService.updateTaxPayer(createdOrder);

		res.status(201).json({
			status: true,
			code: res.statusCode,
			message: 'Order created successfully',
			data: createdOrder
		});
	} catch (error) {
		console.error('Error creating order:', error);

		res.status(500).json({
			status: false,
			code: res.statusCode,
			message: 'Failed to create order'
		});
	}
}

export async function creditScoreHandler(req: Request, res: Response) {
	const { businessId } = req.params;

	const creditScore = await orderService.calculateCreditScore(
		mongoManager,
		businessId
	);

	return res.status(200).json({
		status: true,
		code: res.statusCode,
		message: 'Credit score retrieved successfully',
		data: creditScore
	});
}

export async function orderSummaryHandler(req: Request, res: Response) {
	const { businessId } = req.params;

	const orderSummary = await orderService.orderSummary(
		mongoManager,
		businessId
	);

	return res.status(200).json({
		status: true,
		code: res.statusCode,
		message: 'Order summary retrieved successfully retrieved',
		data: orderSummary
	});
}
