'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: {type:DataTypes.STRING,primaryKey:true},
    id:{type:DataTypes.INTEGER,unique:true, autoIncrement: true},
    password_salt: {type:DataTypes.STRING, allowNull:false},
    password_hash: {type:DataTypes.STRING, allowNull:false},
    email:{type:DataTypes.STRING, allowNull:false}
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};