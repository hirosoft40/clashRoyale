'use strict';

module.exports = (sequelize, DataTypes) => {
	let Session = sequelize.define('Session', {
		sid: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.VARCHAR
		},
		sess: {
			allowNull: false,
			type: DataTypes.TEXT
		},
		expire: {
			allowNull: false,
			type: DataTypes.DATE(6)
		}
	}, {
		freezeTableName: true,
		tableName: 'session',
		timestamps: false,
	});

	return Session;
};
