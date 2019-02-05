'use strict';
module.exports = (sequelize, DataTypes) => {
  const sessions = sequelize.define('sessions', {
    sid:{type:DataTypes.STRING, primaryKey:true},
    expires: DataTypes.DATE,
    data: DataTypes.STRING
  }, {});
  sessions.associate = function(models) {
    // associations can be defined here
  };
  return sessions;
};