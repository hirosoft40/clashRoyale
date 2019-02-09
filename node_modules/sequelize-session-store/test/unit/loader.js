'use strict';

const path = require('path');

const loader = require(path.join(__dirname, '../../index'));

describe('Loader', () => {
	it('should return a function', () => {
		expect(loader).not.toBeNull();
		expect(typeof loader).toEqual('function');
	});

	it('should extend session', () => {
		let mockSession = {
			Store: function() {}
		};
		let store = loader(mockSession);

		expect(Object.getPrototypeOf(store)).toEqual(mockSession.Store);
	});
});
