'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('USERS', {
      ID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(21),
      },
      EMAIL: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      PASSWORD: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      NAME: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      PHONE_NUMBER: {
        type: Sequelize.STRING(21),
      },
      ROLE: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'USER',
      },
      CREATED_AT: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      UPDATED_AT: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('USERS');
  },
};
