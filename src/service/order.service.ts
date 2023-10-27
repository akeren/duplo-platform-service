import { MongoRepository } from 'typeorm';
import { CreateOrderDto } from '../dto';
import { Order } from '../entity';
import { OrderRepository } from '../repository';
import { TaxPayerService } from './tax-payer.service';
import { BadRequestError, DatabaseConnectionError } from '../errors';

export class OrderService {
	constructor(private readonly orderRepository: OrderRepository) {}

	async create(createOrderDto: CreateOrderDto) {
		const order = new Order(createOrderDto);

		return await this.orderRepository.create(order);
	}

	async updateTaxPayer(order: Order) {
		const taxPayerService = new TaxPayerService(
			String(process.env.TAX_PAYER_API_URL)
		);

		const response = await taxPayerService.updateTaxPayerData(order);

		if (!response) {
			console.info(`No response from the tax payer server at the moment`);

			return;
		}

		console.info(`Successfully sent data to the tax authorities`);
		const updatedOrder = await this.orderRepository.findOneAndUpdate(order, {
			isProcessed: true
		});

		console.info(
			`Data has been sent to tax payer with a status update successfully`,
			updatedOrder
		);
		try {
		} catch (error) {
			console.info('Unable to process tax payer updates', error);
		}
	}

	async calculateCreditScore(
		mongoManager: MongoRepository<Order>,
		businessId: string
	) {
		try {
			const orders = await mongoManager.find({ businessId });

			if (orders.length === 0) {
				console.info('No orders found to calculate the credit score.', [
					businessId
				]);
				return 0;
			}

			const totalOrderAmount = orders.reduce(
				(total, order) => total + order.amount,
				0
			);
			const numberTransactions = orders.length;
			const creditScore = totalOrderAmount / (numberTransactions * 100);

			console.log('Credit Score successfully calculated:', [
				{ creditScore, businessId, numberTransactions, totalOrderAmount }
			]);

			return creditScore;
		} catch (error) {
			console.error('Error calculating credit score:', error);
			throw new BadRequestError(
				'Unable to calculate credit score, please try again!'
			);
		}
	}

	async orderSummary(mongoManager: MongoRepository<Order>, businessId: string) {
		try {
			const today = new Date();
			today.setUTCHours(0, 0, 0, 0);

			const orders = await mongoManager.find({ businessId });
			const ordersToday = orders.filter((order) => order.createdAt >= today);

			const totalAmount = orders.reduce((acc, order) => acc + order.amount, 0);
			const totalAmountToday = ordersToday.reduce(
				(acc, order) => acc + order.amount,
				0
			);

			console.info(`Order summary successfully retrieved`);

			return {
				totalOrders: orders.length,
				totalAmountOfOrders: Number(totalAmount),
				totalOrdersToday: ordersToday.length,
				totalAmountOfOrdersToday: Number(totalAmountToday)
			};
		} catch (error) {
			console.error('Error in orderSummary:', error);

			throw new DatabaseConnectionError(
				'An error occurred processing order summary request.'
			);
		}
	}
}
