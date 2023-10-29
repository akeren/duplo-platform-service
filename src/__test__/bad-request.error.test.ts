import { BadRequestError } from '../errors';

describe('BadRequestError', () => {
	it('should create a BadRequestError instance', () => {
		const error = new BadRequestError('Bad request');
		expect(error).toBeInstanceOf(BadRequestError);
	});

	it('should have the correct properties', () => {
		const error = new BadRequestError('Bad request', 400, false);

		expect(error.message).toEqual('Bad request');
		expect(error.statusCode).toEqual(400);
		expect(error.status).toEqual(false);
	});

	it('should correctly serialize errors', () => {
		const error = new BadRequestError('Bad request', 400, false);
		const serialized = error.serializeErrors();

		expect(serialized).toEqual({
			status: false,
			code: 400,
			errors: [{ message: 'Bad request' }]
		});
	});
});
