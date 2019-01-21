'use strict';
module.exports = (sequelize, DataTypes) => {
  const elixircosts = sequelize.define('elixircosts', {
    name: DataTypes.STRING
  }, {});
  elixircosts.associate = function(models) {
    // associations can be defined here
    elixircosts.hasMany(models.cards,{
      onDelete:'CASCADE',
      foreignKey:'elixir_id'
    });
  };
  return elixircosts;
};