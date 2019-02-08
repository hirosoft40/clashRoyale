'use strict';

const path = require('path');

const errors = require(path.join(__dirname, '../../dist/errors.js'));

describe('Class: ValidationError', () => {
	describe('Method: constructor', () => {
		it('should extend error', () => {
			let error = new errors.ValidationError('Test message');

			expect(error instanceof Error).toEqual(true);
			expect(error.name).toEqual('ValidationError');
			expect(error.message).toEqual('Test message');
			expect(error.toString()).toEqual('ValidationError: Test message');
		});
	});
});

describe('Class: ValidationError', () => {
	describe('Method: constructor', () => {
		it('should extend error', () => {
			let error = new errors.ValidationError('Test message');

			expect(error instanceof Error).toEqual(true);
			expect(error.name).toEqual('ValidationError');
			expect(error.message).toEqual('Test message');
			expect(error.toString()).toEqual('ValidationError: Test message');
		});
	});
});

describe('Class: DatabaseError', () => {
	describe('Method: constructor', () => {
		it('should extend error', () => {
			let error = new errors.DatabaseError('Test message');

			expect(error instanceof Error).toEqual(true);
			expect(error.name).toEqual('DatabaseError');
			expect(error.message).toEqual('Test message');
			expect(error.toString()).toEqual('DatabaseError: Test message');
		});
	});
});
