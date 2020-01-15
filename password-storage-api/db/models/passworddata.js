import * as passwordHelper from '../../src/utils/passwordHelper'

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
      allowNull: false,
      set(password) {
        this.setDataValue('password', passwordHelper.encryptPassword(password))
      }
    }
  }, {});
  passwordData.associate = function(models) {
    passwordData.belongsTo(models.User, {
      foreignKey: 'userId'
    })
  };

  /**
   * Get username and password data from passwordData
   * 
   * @param {string} accountName - account name
   * @param {number} userId - user id
   */
  passwordData.getDetailPasswordData = async function(accountName, userId) {
    const data = await passwordData.findOne({
      where: {accountName, userId}
    })
    if (!data){
      throw new Error('Data not found.')
    }

    return {
      accountName,
      username: data.username,
      password: passwordHelper.decryptPassword(data.password)
    }
  }
  return passwordData;
};