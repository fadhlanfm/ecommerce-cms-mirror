'use strict';

const { hashSync } = require('../helpers/bcrypt');
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
        {
          email: 'admin@admin.com',
          password: hashSync('admin'),
          role: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'user@user.com',
          password: hashSync('user'),
          role: 'User',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
