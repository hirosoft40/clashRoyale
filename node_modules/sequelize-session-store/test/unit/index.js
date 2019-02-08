'use strict';

const path = require('path');

const bluebird = require('bluebird');

const SequelizeSessionStore = require(path.join(__dirname, '../../dist/index'));
const errors = require(path.join(__dirname, '../../dist/errors'));

describe('Class: SequelizeSessionStore', () => {
	let mockSession, store, instance;

	beforeEach(() => {
		mockSession = {
			Store: function() {}
		};

		store = SequelizeSessionStore(mockSession);
	});

	describe('Method: constructor', () => {
		let mockDeferred;

		beforeEach(() => {
			mockDeferred = bluebird.defer();

			spyOn(store, 'validateConfig');
			spyOn(store.prototype, 'createModel').and.returnValue(mockDeferred.promise);
			spyOn(store.prototype, 'startCleanJob');
		});

		it('should be an instance of session store', () => {
			expect(Object.getPrototypeOf(store)).toEqual(mockSession.Store);
		});

		it('should call validateConfig', () => {
			instance = new store();

			expect(store.validateConfig).toHaveBeenCalled();
		});

		it('should set options', (done) => {
			let options = {
				sequelize: () => {},
				model: {},
				extras: {
					col1: 'test',
					col2: 'more data'
				},
				expiration: {
					interval: 1000,
					life: 2500
				}
			};

			instance = new store(options);
			mockDeferred.resolve();

			instance.ready.finally(() => {
				expect(instance._sequelize).toBe(options.sequelize);
				expect(instance._model).toBe(options.model);
				expect(instance._extras).toBe(options.extras);
				expect(instance._expirationInterval).toEqual(1000);
				expect(instance._sessionLife).toEqual(2500);
				done();
			});
		});

		it('should use defaults', () => {
			instance = new store();

			expect(instance._expirationInterval).toEqual(1000 * 60 * 60);
			expect(instance._sessionLife).toEqual(1000 * 60 * 60 * 24);
		});

		it('should create a model if one is not given', (done) => {
			let mockModel = {};
			instance = new store();
			mockDeferred.resolve(mockModel);

			instance.ready.finally(() => {
				expect(store.prototype.createModel).toHaveBeenCalled();
				expect(instance._model).toBe(mockModel);
				done();
			});
		});

		it('should call startCleanJob', (done) => {
			instance = new store();
			mockDeferred.resolve({});

			instance.ready.finally(() => {
				expect(store.prototype.startCleanJob).toHaveBeenCalled();
				done();
			});
		});

		it('should reject an error if model could not be created', (done) => {
			spyOn(errors, 'SequelizeSessionStoreError');
			instance = new store();
			mockDeferred.reject();

			instance.ready.catch(() => {
				expect(errors.SequelizeSessionStoreError).toHaveBeenCalledWith('Could not initialize a Session model');
				done();
			});
		});

		it('should not call startCleanJob if no interval', (done) => {
			instance = new store({
				expiration: {
					interval: 0
				}
			});
			mockDeferred.resolve();

			instance.ready.finally(() => {
				expect(store.prototype.startCleanJob).not.toHaveBeenCalled();
				done();
			});
		});
	});

	describe('Method: validateConfig', () => {
		let config, mockDeferred;

		beforeEach(() => {
			mockDeferred = bluebird.defer();
			config = {
				sequelize: {
					authenticate: () => {
						return mockDeferred.promise;
					}
				}
			};

			spyOn(config.sequelize, 'authenticate').and.callThrough();
		});

		it('should throw error if there is no sequelize', () => {
			expect(() => {
				store.validateConfig({});
			}).toThrowError(Error, 'Sequelize instance must be specified');
		});

		it('should authenticate', (done) => {
			mockDeferred.resolve();

			store.validateConfig(config).finally(() => {
				expect(config.sequelize.authenticate).toHaveBeenCalledWith();
				done();
			});
		});

		it('should throw an error if unable to authenticate', (done) => {
			spyOn(errors, 'ValidationError');
			mockDeferred.reject('REJECTION');

			store.validateConfig(config).catch(() => {
				expect(errors.ValidationError).toHaveBeenCalledWith('Unable to connect to database: REJECTION');
				done();
			});
		});

		it('should throw error if any required fields are missing', (done) => {
			spyOn(errors, 'ValidationError');
			mockDeferred.resolve();
			config.model = {};

			store.validateConfig(config).catch(() => {
				expect(errors.ValidationError).toHaveBeenCalledWith('The following required columns are missing: sid, sess, expire');
				done();
			});
		});

		it('should throw error if wrong primary key', (done) => {
			spyOn(errors, 'ValidationError');
			mockDeferred.resolve();
			config.model = {
				sid: '',
				sess: '',
				expire: '',
				primaryKeyField: 'NOT SID'
			};

			store.validateConfig(config).catch(() => {
				expect(errors.ValidationError).toHaveBeenCalledWith('Expected sid for primary key field but got NOT SID');
				done();
			});
		});

		it('should throw error if wrong type for expiration', (done) => {
			spyOn(errors, 'ValidationError');
			mockDeferred.resolve();
			config.model = {
				sid: '',
				sess: '',
				expire: '',
				primaryKeyField: 'sid'
			};
			config.expiration = '';

			store.validateConfig(config).catch(() => {
				expect(errors.ValidationError).toHaveBeenCalledWith('Expected object for type of option expiration but got string');
				done();
			});
		});

		it('should throw error if wrong type of extras', (done) => {
			spyOn(errors, 'ValidationError');
			mockDeferred.resolve();
			config.expiration = {};
			config.extras = {};
			config.model = {
				sid: '',
				sess: '',
				expire: '',
				primaryKeyField: 'sid',
				expiration: ''
			};

			store.validateConfig(config).catch(() => {
				expect(errors.ValidationError).toHaveBeenCalledWith('Expected field extras to be type function but got type object');
				done();
			});
		});
	});

	describe('Method: createModel', () => {
		let mockSequelize, mockSession, mockDeferred;

		beforeEach(() => {
			mockDeferred = bluebird.defer();

			mockSession = {
				sync: () => {
					return mockDeferred.promise;
				}
			};

			mockSequelize = {
				import: () => {
					return mockSession;
				}
			};

			spyOn(store, 'validateConfig');
			spyOn(mockSession, 'sync').and.callThrough();
			spyOn(mockSequelize, 'import').and.callThrough();

			instance = new store({
				model: {},
				sequelize: mockSequelize,
				expiration: {
					interval: 0
				}
			});
		});

		it('should import model file', (done) => {
			mockDeferred.resolve();

			instance.createModel().finally(() => {
				expect(mockSequelize.import).toHaveBeenCalledWith(path.join(__dirname, '../../dist/model.js'));
				done();
			});
		});

		it('should sync', (done) => {
			mockDeferred.resolve();

			instance.createModel().finally(() => {
				expect(mockSession.sync).toHaveBeenCalledWith();
				done();
			});
		});

		it('should throw error on failing to create', (done) => {
			spyOn(errors, 'DatabaseError');
			mockDeferred.reject('DATABASE ERROR');

			instance.createModel().catch(() => {
				expect(errors.DatabaseError).toHaveBeenCalledWith('Could not create default table: DATABASE ERROR');
				done();
			});
		});
	});

	describe('Method: all', () => {
		let mockModel, mockDeferred, cb;

		beforeEach(() => {
			mockDeferred = bluebird.defer();

			mockModel = {
				findAll: () => {
					return mockDeferred.promise;
				}
			};

			cb = jasmine.createSpy('cb');

			spyOn(store, 'validateConfig');
			spyOn(mockModel, 'findAll').and.callThrough();


			instance = new store({
				model: mockModel,
				sequelize: {},
				expiration: {
					interval: 0
				}
			});
		});

		it('should call callback with sessions', (done) => {
			let mockSessions = [];
			mockDeferred.resolve(mockSessions);

			instance.ready.then(() => {
				return instance.all(cb);
			}).finally(() => {
				expect(mockModel.findAll).toHaveBeenCalledWith();
				expect(cb).toHaveBeenCalledWith(null, mockSessions);
				done();
			});
		});

		it('should call callback with error', (done) => {
			let errors = [];
			mockDeferred.reject(errors);

			instance.ready.then(() => {
				return instance.all(cb);
			}).finally(() => {
				expect(cb).toHaveBeenCalledWith(errors, null);
				done();
			});
		});
	});

	describe('Method: destroy', () => {
		let mockModel, mockDeferred, cb;

		beforeEach(() => {
			mockDeferred = bluebird.defer();

			mockModel = {
				destroy: () => {
					return mockDeferred.promise;
				}
			};

			cb = jasmine.createSpy('cb');

			spyOn(store, 'validateConfig');
			spyOn(mockModel, 'destroy').and.callThrough();

			instance = new store({
				model: mockModel,
				sequelize: {},
				expiration: {
					interval: 0
				}
			});
		});

		it('should call callback with null', (done) => {
			mockDeferred.resolve();

			instance.ready.then(() => {
				return instance.destroy(10, cb);
			}).finally(() => {
				expect(mockModel.destroy).toHaveBeenCalledWith({where: {sid: 10}});
				expect(cb).toHaveBeenCalledWith(null);
				done();
			});
		});

		it('should call callback with error', (done) => {
			let errors = [];
			mockDeferred.reject(errors);

			instance.ready.then(() => {
				return instance.destroy(10, cb);
			}).finally(() => {
				expect(cb).toHaveBeenCalledWith(errors);
				done();
			});
		});
	});

	describe('Method: clear', () => {
		let mockModel, mockDeferred, cb;

		beforeEach(() => {
			mockDeferred = bluebird.defer();

			mockModel = {
				destroy: () => {
					return mockDeferred.promise;
				}
			};

			cb = jasmine.createSpy('cb');

			spyOn(store, 'validateConfig');
			spyOn(mockModel, 'destroy').and.callThrough();

			instance = new store({
				model: mockModel,
				sequelize: {},
				expiration: {
					interval: 0
				}
			});
		});

		it('should call callback with null', (done) => {
			mockDeferred.resolve();

			instance.ready.then(() => {
				return instance.clear(cb);
			}).finally(() => {
				expect(mockModel.destroy).toHaveBeenCalledWith();
				expect(cb).toHaveBeenCalledWith(null);
				done();
			});
		});

		it('should call callback with error', (done) => {
			let errors = [];
			mockDeferred.reject(errors);

			instance.ready.then(() => {
				return instance.clear(cb);
			}).finally(() => {
				expect(cb).toHaveBeenCalledWith(errors);
				done();
			});
		});
	});

	describe('Method: length', () => {
		let mockModel, mockDeferred, cb;

		beforeEach(() => {
			mockDeferred = bluebird.defer();

			mockModel = {
				count: () => {
					return mockDeferred.promise;
				}
			};

			cb = jasmine.createSpy('cb');

			spyOn(store, 'validateConfig');
			spyOn(mockModel, 'count').and.callThrough();

			instance = new store({
				model: mockModel,
				sequelize: {},
				expiration: {
					interval: 0
				}
			});
		});

		it('should call callback with count', (done) => {
			mockDeferred.resolve(100);

			instance.ready.then(() => {
				return instance.length(cb);
			}).finally(() => {
				expect(mockModel.count).toHaveBeenCalledWith();
				expect(cb).toHaveBeenCalledWith(null, 100);
				done();
			});
		});

		it('should call callback with error', (done) => {
			let errors = [];
			mockDeferred.reject(errors);

			instance.ready.then(() => {
				return instance.length(cb);
			}).finally(() => {
				expect(cb).toHaveBeenCalledWith(errors, null);
				done();
			});
		});
	});

	describe('Method: get', () => {
		let mockModel, mockDeferred, cb;

		beforeEach(() => {
			mockDeferred = bluebird.defer();

			mockModel = {
				findOne: () => {
					return mockDeferred.promise;
				}
			};

			cb = jasmine.createSpy('cb');

			spyOn(store, 'validateConfig');
			spyOn(mockModel, 'findOne').and.callThrough();

			instance = new store({
				model: mockModel,
				sequelize: {},
				expiration: {
					interval: 0
				}
			});
		});

		it('should call callback with session', (done) => {
			let session = {};
			mockDeferred.resolve(session);

			instance.ready.then(() => {
				return instance.get(100, cb);
			}).finally(() => {
				expect(mockModel.findOne).toHaveBeenCalledWith({where: {sid: 100}});
				expect(cb).toHaveBeenCalledWith(null, session);
				done();
			});
		});

		it('should call callback with error', (done) => {
			let errors = [];
			mockDeferred.reject(errors);

			instance.ready.then(() => {
				return instance.get(100, cb);
			}).finally(() => {
				expect(cb).toHaveBeenCalledWith(errors, null);
				done();
			});
		});
	});

	describe('Method: set', () => {
		let mockDeferred, mockModel, mockExtras, mockSession, cb;

		beforeEach(() => {
			mockDeferred = bluebird.defer();

			mockSession = {
				cookie: {
					expire: ''
				}
			};

			mockModel = {
				upsert: () => {
					return mockDeferred.promise;
				},
				rawAttributes: {
					sid: '',
					session: '',
					expire: '',
					prop1: '',
					prop2: ''
				}
			};

			cb = jasmine.createSpy('cb');
			mockExtras = jasmine.createSpy('extras').and.callFake((obj) => {
				obj.prop1 = '';
				obj.prop2 = '';
			});

			spyOn(store, 'validateConfig');
			spyOn(mockModel, 'upsert').and.callThrough();

			instance = new store({
				model: mockModel,
				sequelize: {},
				expiration: {
					interval: 0
				},
				extras: mockExtras
			});
		});

		it('should call extras', (done) => {
			instance._extras = jasmine.createSpy('temp');
			mockDeferred.resolve();

			instance.ready.finally(() => {
				return instance.set('SID', mockSession, cb);
			}).catch(() => {
				expect(instance._extras).toHaveBeenCalledWith({});
				done();
			});
		});

		it('should throw error if missing fields', (done) => {
			instance.ready.finally(() => {
				expect(() => {
					instance._extras = () => {};
					instance.set('SID', mockSession, cb);
				}).toThrowError(Error, 'The following fields are required: prop1, prop2');
				done();
			});
		});

		it('should call upsert', (done) => {
			mockDeferred.resolve();

			instance.ready.finally(() => {
				return instance.set('SID', mockSession, cb);
			}).finally(() => {
				expect(mockModel.upsert).toHaveBeenCalledWith({
					sid: 'SID',
					session: {
						cookie: {
							expire: ''
						}
					},
					expire: '',
					prop1: '',
					prop2: ''
				});
				done();
			});
		});

		it('should call cb with null', (done) => {
			mockDeferred.resolve();

			instance.ready.finally(() => {
				return instance.set('SID', mockSession, cb);
			}).finally(() => {
				expect(cb).toHaveBeenCalledWith(null);
				done();
			});
		});

		it('should call cb with error on rejection', (done) => {
			mockDeferred.reject({error: true});

			instance.ready.finally(() => {
				return instance.set('SID', mockSession, cb);
			}).finally(() => {
				expect(cb).toHaveBeenCalledWith({error: true});
				done();
			});
		});
	});

	describe('Method: touch', () => {
		let mockDeferred, mockModel, cb;

		beforeEach(() => {
			mockDeferred = bluebird.defer();

			mockModel = {
				update: () => {
					return mockDeferred.promise;
				}
			};

			cb = jasmine.createSpy('cb');

			spyOn(store, 'validateConfig');
			spyOn(mockModel, 'update').and.callThrough();

			instance = new store({
				model: mockModel,
				sequelize: {},
				expiration: {
					interval: 0
				}
			});

			spyOn(Date, 'now').and.returnValue(1450000000000);
		});

		it('should use sessionLife', (done) => {
			mockDeferred.resolve();

			instance.ready.finally(() => {
				instance._sessionLife = 1000;

				return instance.touch('SID', {}, cb);
			}).finally(() => {
				expect(mockModel.update).toHaveBeenCalledWith({expire: new Date(1450000001000)});
				done();
			});
		});

		it('should use sessionLife', (done) => {
			mockDeferred.resolve();

			instance.ready.finally(() => {
				instance._sessionLife = null;

				return instance.touch('SID', {
					cookie: {
						maxAge: 1000
					}
				}, cb);
			}).finally(() => {
				expect(mockModel.update).toHaveBeenCalledWith({expire: new Date(1450000001000)});
				done();
			});
		});

		it('should call cb with null on resolve', (done) => {
			mockDeferred.resolve();

			instance.ready.finally(() => {
				instance._sessionLife = null;

				return instance.touch('SID', {
					cookie: {
						maxAge: 1000
					}
				}, cb);
			}).finally(() => {
				expect(cb).toHaveBeenCalledWith(null);
				done();
			});
		});

		it('should call cb with error on rejection', (done) => {
			mockDeferred.reject({error: true});

			instance.ready.finally(() => {
				instance._sessionLife = null;

				return instance.touch('SID', {
					cookie: {
						maxAge: 1000
					}
				}, cb);
			}).finally(() => {
				expect(cb).toHaveBeenCalledWith({error: true});
				done();
			});
		});
	});

	describe('Method: cleanExpired', () => {
		let mockModel, mockDeferred;

		beforeEach(() => {
			mockDeferred = bluebird.defer();

			mockModel = {
				destroy: () => {
					return mockDeferred.promise;
				}
			};

			spyOn(store, 'validateConfig');
			spyOn(mockModel, 'destroy').and.callThrough();
			spyOn(Date.prototype, 'toISOString').and.returnValue('2016-09-01T12:00:00.000Z');

			instance = new store({
				model: mockModel,
				sequelize: {},
				expiration: {
					interval: 0
				}
			});
		});

		it('should destroy and return count', (done) => {
			mockDeferred.resolve(10);

			instance.ready.then(() => {
				return instance.cleanExpired();
			}).then((count) => {
				expect(mockModel.destroy).toHaveBeenCalledWith({where: {expire: {lt: '2016-09-01T12:00:00.000Z'}}});
				expect(count).toEqual(10);
				done();
			});
		});

		it('should call callback with error', (done) => {
			spyOn(errors, 'SequelizeSessionStoreError');
			mockDeferred.reject();

			instance.ready.then(() => {
				return instance.cleanExpired();
			}).catch(() => {
				expect(errors.SequelizeSessionStoreError).toHaveBeenCalledWith('Error deleting expired sessions');
				done();
			});
		});
	});

	describe('Method: startCleanJob', () => {
		beforeEach(() => {
			spyOn(store, 'validateConfig');
			spyOn(store.prototype, 'cleanExpired');

			instance = new store({
				model: {},
				sequelize: {},
				expiration: {
					interval: 20
				}
			});
		});

		it('should cleanExpired', (done) => {
			instance.startCleanJob();
			setTimeout(() => {
				expect(store.prototype.cleanExpired).toHaveBeenCalledWith();
				expect(instance._expirationIntervalTimer).not.toBeNull();
				done();
			}, 100);
		});

		it('should first stop the job', (done) => {
			instance._expirationIntervalTimer = true;
			spyOn(instance, 'stopCleanJob');

			setTimeout(() => {
				expect(instance.stopCleanJob);
				expect(store.prototype.cleanExpired).toHaveBeenCalledWith();
				expect(instance._expirationIntervalTimer).not.toBeNull();
				done();
			}, 100);
		});
	});

	describe('Method: stopCleanJob', () => {
		beforeEach(() => {
			spyOn(store, 'validateConfig');
			spyOn(store.prototype, 'cleanExpired').and.callFake(() => {});

			instance = new store({
				model: {},
				sequelize: {},
				expiration: {
					interval: 20
				}
			});
		});

		it('should do nothing if timer is falsy', () => {
			instance._expirationIntervalTimer = false;
			instance.stopCleanJob();
			expect(instance._expirationIntervalTimer).toBeFalsy();
		});

		it('should clear interval and set timer to null', () => {
			let interval = setInterval(() => {}, 10000);
			instance._expirationIntervalTimer = interval;
			instance.stopCleanJob();

			expect(instance._expirationIntervalTimer).toEqual(null);
		});
	});
});
