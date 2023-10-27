import { ObjectId } from 'typeorm';

export interface ITaxPayer {
	order_id: ObjectId;
	order_amount: number;
	platform_code: string;
}
