import { DatabaseConnectionError } from '../errors';

describe('DatabaseConnectionError', () => {
	it('should create a DatabaseConnectionError instance', () => {
		const error = new DatabaseConnectionError();
		expect(error).toBeInstanceOf(DatabaseConnectionError);
	});

	it('should have the correct properties', () => {
		const error = new DatabaseConnectionError('Error message', 500, false);

		expect(error.message).toEqual('Error message');
		expect(error.statusCode).toEqual(500);
		expect(error.status).toEqual(false);
	});

	it('should use default values if no arguments are provided', () => {
		const error = new DatabaseConnectionError();
		expect(error.message).toEqual('Error connecting to database!');
		expect(error.statusCode).toEqual(500);
		expect(error.status).toEqual(false);
	});

	it('should correctly serialize errors', () => {
		const error = new DatabaseConnectionError('Error message', 500, false);
		const serialized = error.serializeErrors();

		expect(serialized).toEqual({
			status: false,
			code: 500,
			errors: [{ message: 'Error message' }]
		});
	});
});
