'use strict';

class SequelizeSessionStoreError extends Error {
	constructor(message) {
		super(message);

		this.name = 'SequelizeSessionStoreError';
	}
}

class ValidationError extends Error {
	constructor(message) {
		super(message);

		this.name = 'ValidationError';
	}
}

class DatabaseError extends Error {
	constructor(message) {
		super(message);

		this.name = 'DatabaseError';
	}
}

module.exports = {
	SequelizeSessionStoreError: SequelizeSessionStoreError,
	ValidationError: ValidationError,
	DatabaseError: DatabaseError
};
