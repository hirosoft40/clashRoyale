'use strict';
module.exports = (sequelize, DataTypes) => {
  const feedbacks = sequelize.define('feedbacks', {
    name: DataTypes.STRING,
    feedback: DataTypes.STRING
  }, {});
  feedbacks.associate = function(models) {
    // associations can be defined here
    feedbacks.belongsTo(models.feelings,{
      onDelete:'CASCADE',
      foreignKey:'icon_id'
    })
  };
  return feedbacks;
};