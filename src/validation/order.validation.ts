import { body } from 'express-validator';

export const createOrderRequest = [
	body('businessId')
		.isString()
		.notEmpty()
		.withMessage('Business is a required field')
		.isLength({ max: 255 })
		.trim(),
	body('amount')
		.isFloat()
		.notEmpty()
		.withMessage('Amount is a required field')
		.isLength({ max: 255 })
		.trim(),
	body('status')
		.isString()
		.notEmpty()
		.withMessage('Order status is a required field')
		.isLength({ max: 255 })
		.trim()
];
