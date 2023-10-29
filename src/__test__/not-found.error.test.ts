import { NotFoundError } from '../errors';

describe('NotFoundError', () => {
	it('should create a NotFoundError instance', () => {
		const error = new NotFoundError();
		expect(error).toBeInstanceOf(NotFoundError);
	});

	it('should have the correct properties', () => {
		const error = new NotFoundError('Custom message', 404, false);

		expect(error.message).toEqual('Custom message');
		expect(error.statusCode).toEqual(404);
		expect(error.status).toEqual(false);
	});

	it('should use default values if no arguments are provided', () => {
		const error = new NotFoundError();
		expect(error.message).toEqual('Resource not found.');
		expect(error.statusCode).toEqual(404);
		expect(error.status).toEqual(false);
	});

	it('should correctly serialize errors', () => {
		const error = new NotFoundError('Custom message', 404, false);
		const serialized = error.serializeErrors();

		expect(serialized).toEqual({
			status: false,
			code: 404,
			errors: [{ message: 'Custom message' }]
		});
	});
});
