'use strict';
const bcrypt = require('bcrypt')

const encryptAuthenticationPassword = (password) => {
  const salt = bcrypt.genSaltSync(16)
  const hash = bcrypt.hashSync(password, salt)

  return hash
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        password: encryptAuthenticationPassword('Hello'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'John Wick',
        password: encryptAuthenticationPassword('World'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
