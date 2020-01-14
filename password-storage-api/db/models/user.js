'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    name:{
      type:  DataTypes.STRING,
      allowNull: false
    },
    password: {
      type:  DataTypes.STRING,
      allowNull: false
    }
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};