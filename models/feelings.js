'use strict';
module.exports = (sequelize, DataTypes) => {
  const feelings = sequelize.define('feelings', {
    name: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {});
  feelings.associate = function(models) {
    // associations can be defined here
    feelings.hasMany(models.feedbacks,{foreignKey:'icon_id'});
  };
  return feelings;
};