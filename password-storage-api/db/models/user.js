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
    user.hasMany(models.PasswordData, {
      foreignKey: 'userId'
    })
  };

  /**
   * Get user account list.
   */
  user.prototype.getAccountList = async function() {
    const passwordData = await this.getPasswordData()

    // filter so that list only contains accountName
    const accountList = passwordData.map(datum => datum.accountName)

    return accountList
  }
  return user;
};