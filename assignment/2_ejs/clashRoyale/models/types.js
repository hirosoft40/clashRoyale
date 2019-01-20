'use strict';
module.exports = (sequelize, DataTypes) => {
  const types = sequelize.define('types', {
    name: DataTypes.STRING
  }, {});
  types.associate = function(models) {
    // associations can be defined here
        types.hasMany(models.cards,{
        onDelete:'CASCADE',
        foreignKey:'type_id'
      });
  };
  return types;
};