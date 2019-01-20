'use strict';
module.exports = (sequelize, DataTypes) => {
  const arenas = sequelize.define('arenas', {
    name: DataTypes.STRING,
    arenaName: DataTypes.STRING
  }, {});
  arenas.associate = function(models) {
    // associations can be defined here
    arenas.hasMany(models.cards,{
      onDelete:'CASCADE',
      foreignKey:'arena_id'
    });
  };
  return arenas;
};