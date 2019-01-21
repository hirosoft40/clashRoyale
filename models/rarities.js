'use strict';
module.exports = (sequelize, DataTypes) => {
  const rarities = sequelize.define('rarities', {
    name: DataTypes.STRING
  }, {});
  rarities.associate = function(models) {
    // associations can be defined here
    rarities.hasMany(models.cards,{
      onDelete:'CASCADE',
      foreignKey:'rarity_id'
    });
  };
  return rarities;
};