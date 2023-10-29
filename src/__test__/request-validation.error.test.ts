import { RequestValidationError } from '../errors';
import { ValidationError } from 'express-validator';

describe('RequestValidationError', () => {
	it('should create a RequestValidationError instance', () => {
		const errors = [
			{ msg: 'Invalid field 1', type: 'field1' },
			{ msg: 'Invalid field 2', type: 'field2' }
		] as unknown as ValidationError[];

		const error = new RequestValidationError(errors);
		expect(error).toBeInstanceOf(RequestValidationError);
	});

	it('should have the correct properties and formatted validation errors', () => {
		const errors = [
			{ msg: 'Invalid field 1', type: 'field1' },
			{ msg: 'Invalid field 2', type: 'field2' }
		] as unknown as ValidationError[];

		const error = new RequestValidationError(errors, 422, false);

		expect(error.message).toEqual('Invalid request parameters');
		expect(error.statusCode).toEqual(422);
		expect(error.status).toEqual(false);
		expect(error.errors).toEqual(errors);
	});

	it('should correctly serialize errors', () => {
		const errors = [
			{ msg: 'Invalid field 1', type: 'field1' },
			{ msg: 'Invalid field 2', type: 'field2' }
		] as unknown as ValidationError[];

		const error = new RequestValidationError(errors as any, 422, false);
		const serialized = error.serializeErrors();

		expect(serialized).toEqual({
			status: false,
			code: 422,
			errors: [
				{ message: 'Invalid field 1', field: 'field1' },
				{ message: 'Invalid field 2', field: 'field2' }
			]
		});
	});
});
