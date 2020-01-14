'use strict';
module.exports = (sequelize, DataTypes) => {
  const passwordData = sequelize.define('PasswordData', {
    userId: DataTypes.INTEGER,
    accountName: {
      type:  DataTypes.STRING,
      allowNull: false
    },
    username: {
      type:  DataTypes.STRING,
      allowNull: false
    },
    password: {
      type:  DataTypes.STRING,
      allowNull: false
    }
  }, {});
  passwordData.associate = function(models) {
    // associations can be defined here
  };
  return passwordData;
};