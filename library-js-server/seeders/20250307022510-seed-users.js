'use strict';
const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('USERS', [
      {
        ID: 'U001',
        EMAIL: 'user1@google.com',
        PASSWORD: hashPassword('Password123'),
        NAME: 'User One',
        PHONE_NUMBER: '081234567890',
        ROLE: 'USER',
        CREATED_AT: new Date(),
        UPDATED_AT: new Date(),
      },
      {
        ID: 'U002',
        EMAIL: 'user2@google.com',
        PASSWORD: hashPassword('Password123'),
        NAME: 'User Two',
        PHONE_NUMBER: '081234567891',
        ROLE: 'USER',
        CREATED_AT: new Date(),
        UPDATED_AT: new Date(),
      },
      {
        ID: 'U003',
        EMAIL: 'user3@google.com',
        PASSWORD: hashPassword('Password123'),
        NAME: 'Admin Three',
        PHONE_NUMBER: '081234567892',
        ROLE: 'ADMIN',
        CREATED_AT: new Date(),
        UPDATED_AT: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('USERS', null, {});
  },
};
