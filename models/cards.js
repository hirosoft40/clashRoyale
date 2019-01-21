'use strict';
module.exports = (sequelize, DataTypes) => {
  const cards = sequelize.define('cards', {
    name: DataTypes.STRING,
    summary: DataTypes.TEXT,
    img_url: DataTypes.STRING
  }, {});
  cards.associate = function(models) {
    // associations can be defined here
    cards.belongsTo(models.types,{foreignKey:'type_id'})
    cards.belongsTo(models.arenas,{foreignKey:'arena_id'})
    cards.belongsTo(models.elixircosts,{foreignKey:'elixir_id'})
    cards.belongsTo(models.rarities,{foreignKey:'rarity_id'})
  };
  return cards;
};