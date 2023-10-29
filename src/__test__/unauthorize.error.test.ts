import { UnauthorizedError } from '../errors';

describe('UnauthorizedError', () => {
	it('should create an UnauthorizedError instance', () => {
		const error = new UnauthorizedError('Unauthorized');
		expect(error).toBeInstanceOf(UnauthorizedError);
	});

	it('should have the correct properties', () => {
		const error = new UnauthorizedError('Custom message', 401, false);

		expect(error.message).toEqual('Custom message');
		expect(error.statusCode).toEqual(401);
		expect(error.status).toEqual(false);
	});

	it('should correctly serialize errors', () => {
		const error = new UnauthorizedError('Custom message', 401, false);
		const serialized = error.serializeErrors();

		expect(serialized).toEqual({
			status: false,
			code: 401,
			errors: [{ message: 'Custom message' }]
		});
	});
});
