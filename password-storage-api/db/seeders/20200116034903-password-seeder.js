'use strict';

const cryptojs = require('crypto-js')

const encryptPassword = (password) => {
  const cipher = cryptojs.AES.encrypt(password, process.env.PASSWORD_SECRET)
  return cipher.toString()
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PasswordData', [
      {
        accountName: 'facebook',
        username: 'doe1',
        password: encryptPassword('doe1'),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountName: 'instagram',
        username: 'doe2',
        password: encryptPassword('doe2'),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountName: 'twitter',
        username: 'doe3',
        password: encryptPassword('doe3'),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountName: 'facebook',
        username: 'wick1',
        password: encryptPassword('wick1'),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountName: 'instagram',
        username: 'wick2',
        password: encryptPassword('wick2'),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accountName: 'twitter',
        username: 'wick3',
        password: encryptPassword('wick3'),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PasswordData', null, {});
  }
};
