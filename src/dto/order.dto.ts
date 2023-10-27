export class CreateOrderDto {
	businessId: string;
	status: string;
	amount: number;

	constructor(businessId: string, status: string, amount: number) {
		this.businessId = businessId;
		this.status = status;
		this.amount = amount;
	}
}
