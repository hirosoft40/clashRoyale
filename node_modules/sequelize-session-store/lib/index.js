'use strict';

const path = require('path');

const bluebird = require('bluebird');

const errors = require('./errors');

function storeManager(session) {
	class SequelizeSessionStore extends session.Store {
		constructor(config) {
			super();

			config = config || {};

			SequelizeSessionStore.validateConfig(config);

			this._sequelize = config.sequelize;

			this._extras = config.extras;

			this._expirationInterval = (
				config.expiration && ((config.expiration.interval !== undefined) || (config.expiration.interval !== null))
			) ? config.expiration.interval : 1000 * 60 * 60;

			this._sessionLife = (
				config.expiration && ((config.expiration.life !== undefined) || (config.expiration.life !== null))
			) ? config.expiration.life : 1000 * 60 * 60 * 24;

			let promise;

			if (config.model) {
				promise = bluebird.resolve(config.model);
			} else {
				promise = this.createModel();
			}

			this.ready = promise.then((Session) => {
				this._model = Session;

				if (this._expirationInterval) {
					this.startCleanJob();
				}

				return Session;
			}, () => {
				throw new errors.SequelizeSessionStoreError('Could not initialize a Session model');
			});
		}

		static validateConfig(config) {
			if (!('sequelize' in config)) {
				throw new errors.ValidationError('Sequelize instance must be specified');
			}

			return config.sequelize.authenticate().then(() => {
				if (!('model' in config)) {
					return;
				}

				const required = ['sid', 'sess', 'expire'];

				let missing = [];

				for (let req of required) {
					if (!(req in config.model)) {
						missing.push(req);
					}
				}

				if (missing.length) {
					throw new errors.ValidationError(`The following required columns are missing: ${missing.join(', ')}`);
				}

				if (config.model.primaryKeyField !== 'sid') {
					throw new errors.ValidationError(`Expected sid for primary key field but got ${config.model.primaryKeyField}`);
				}

				if (typeof config.expiration !== 'object') {
					throw new errors.ValidationError(`Expected object for type of option expiration but got ${typeof config.expiration}`);
				}

				if (config.extras && (typeof config.extras !== 'function')) {
					throw new errors.ValidationError(`Expected field extras to be type function but got type ${typeof config.extras}`);
				}
			}, (err) => {
				throw new errors.ValidationError(`Unable to connect to database: ${err}`);
			});
		}

		createModel() {
			let Session = this._sequelize.import(path.join(__dirname, './model.js'));

			return Session.sync().then(() => {
				return Session;
			}).catch((err) => {
				throw new errors.DatabaseError(`Could not create default table: ${err}`);
			});
		}

		all(cb) {
			return this._model.findAll().then((sessions) => {
				cb(null, sessions);
			}, (err) => {
				cb(err, null);
			});
		}

		destroy(sid, cb) {
			return this._model.destroy({
				where: {
					sid: sid
				}
			}).then(() => {
				cb(null);
			}, (err) => {
				cb(err);
			});
		}

		clear(cb) {
			return this._model.destroy().then(() => {
				cb(null);
			}, (err) => {
				cb(err);
			});
		}

		length(cb) {
			return this._model.count().then((count) => {
				cb(null, count);
			}, (err) => {
				cb(err, null);
			});
		}

		get(sid, cb) {
			return this._model.findOne({
				where: {
					sid: sid
				}
			}).then((session) => {
				cb(null, session);
			}, (err) => {
				cb(err, null);
			});
		}

		set(sid, session, cb) {
			let missing = [];

			let values = {
				sid: sid,
				session: session,
				expire: session.cookie.expire
			};

			let extended = {};
			this._extras(extended);

			for (let col in this._model.rawAttributes) {
				if (col in values) {
					continue;
				}

				if (!(col in extended)) {
					missing.push(col);
				}
			}

			if (missing.length) {
				throw new errors.SequelizeSessionStoreError(`The following fields are required: ${missing.join(', ')}`);
			}

			return this._model.upsert(Object.assign({}, extended, values)).then(() => {
				cb(null);
			}, (err) => {
				cb(err);
			});
		}

		touch(sid, session, cb) {
			let expires = session.cookie ? new Date(Date.now() + session.cookie.maxAge) : new Date(Date.now() + this._sessionLife);

			return this._model.update({
				expire: expires
			}).then(() => {
				cb(null);
			}, (err) => {
				cb(err);
			});
		}

		cleanExpired() {
			return this._model.destroy({
				where: {
					expire: {
						lt: new Date().toISOString()
					}
				}
			}).then((count) => {
				return count;
			}, () => {
				throw new errors.SequelizeSessionStoreError('Error deleting expired sessions');
			});
		}

		startCleanJob() {
			if (this._expirationIntervalTimer) {
				this.stopCleanJob();
			}

			this._expirationIntervalTimer = setInterval(this.cleanExpired, this._expirationInterval);
		}

		stopCleanJob() {
			if (this._expirationIntervalTimer) {
				clearInterval(this._expirationIntervalTimer);
				this._expirationIntervalTimer = null;
			}
		}
	}

	return SequelizeSessionStore;
}

module.exports = storeManager;
