import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import CircuitBreaker from 'opossum';

export class ApiRequestHandlerService {
	private circuit: CircuitBreaker;
	private retries: number = 0;

	constructor(
		private readonly apiUrl: string,
		private readonly httpVerb: string
	) {
		this.circuit = new CircuitBreaker(this.makeApiRequest, {
			timeout: 100000,
			errorThresholdPercentage: 50,
			resetTimeout: 50000
		});

		this.circuit.fallback(() => {
			console.error('Circuit is open. Making use of fallback response.');

			return Promise.resolve(this.getFallbackData());
		});
	}

	private makeApiRequest = async (config: AxiosRequestConfig): Promise<any> => {
		try {
			console.info(`Initiating axios request`);

			const response: AxiosResponse = await axios({
				method: this.httpVerb,
				url: this.apiUrl,
				...config
			});

			this.validateResponse(response);

			console.info(
				`Successfully gotten positive response from the server`,
				response.data
			);

			return response.data;
		} catch (error) {
			console.error(`Unable to successfully make the API call`, error);

			throw error;
		}
	};

	private validateResponse(response: AxiosResponse) {
		if (response.status !== 200) {
			console.error(`Failed API request call:`, response);

			throw new Error(
				`API request failed with status code: ${response.status}`
			);
		}
	}

	private getFallbackData() {
		// Define your own fallback data or logic here
	}

	public executeApiRequestWithRetry = async (
		config: AxiosRequestConfig = {}
	): Promise<any> => {
		try {
			this.retries = 0;
			console.info(`Successfully reset retry counter to ${this.retries}`);

			console.info('Firing the circuit');
			const data = await this.circuit.fire(config);

			console.info(`Resolved value after firing the circuit`, data);

			return data;
		} catch (error) {
			console.info(`Initiating execution of the API retry strategy`);
			if (this.retries < 3) {
				console.log(`Increasing the retry counter`);
				this.retries++;

				console.info(
					`Successfully increased retry counter to: ${this.retries}`
				);

				const delay = 1000 * Math.pow(2, this.retries);
				console.info(
					`Retrying the API call again in ${delay / 1000} seconds...`
				);

				await new Promise((resolve) => setTimeout(resolve, delay));

				console.info(`Invoking the another API call`);
				return this.executeApiRequestWithRetry(config);
			} else {
				console.error('Maximum retries reached for the API call', error);

				throw error;
			}
		}
	};
}
