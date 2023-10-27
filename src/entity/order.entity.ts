import { Entity, Column } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Order extends AbstractEntity<Order> {
	@Column()
	businessId: string;

	@Column()
	amount: number;

	@Column()
	status: string;

	@Column({ default: false })
	isProcessed: boolean;
}
