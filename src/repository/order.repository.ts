import { AbstractRepository } from './abstract.repository';
import { EntityManager, Repository } from 'typeorm';
import { Order } from '../entity';

export class OrderRepository extends AbstractRepository<Order> {
	[x: string]: any;
	constructor(orderRepository: Repository<Order>, entityManger: EntityManager) {
		super(orderRepository, entityManger);
	}
}
