import * as passwordHelper from '../../src/utils/passwordHelper'
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    name:{
      type:  DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type:  DataTypes.STRING,
      allowNull: false,
      set(password) {
        this.setDataValue('password', passwordHelper.encryptAuthenticationPassword(password))
      }
    }
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};