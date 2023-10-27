import { AxiosRequestConfig } from 'axios';
import { ApiRequestHandlerService } from './api-request-handler.service';
import { Order } from '../entity';
import { ITaxPayer } from '../dto';

export class TaxPayerService extends ApiRequestHandlerService {
	constructor(apiUrl: string, httpVerb: string = 'GET') {
		super(apiUrl, httpVerb);
	}

	public async updateTaxPayerData(order: Order): Promise<any> {
		console.info(`Preparing Tax payer request payload`);
		const taxPayerData: ITaxPayer = {
			order_id: order.id,
			order_amount: Number(order.amount),
			platform_code: '022'
		};

		console.info(`Tax payer payer payload`, taxPayerData);

		const config: AxiosRequestConfig = {
			method: 'POST',
			data: taxPayerData
		};

		return await this.executeApiRequestWithRetry(config);
	}
}
