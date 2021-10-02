'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
        type: Sequelize.STRING
      },
      phone: {
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
        type: Sequelize.STRING
      },
      password: {
        validate: {
          notEmpty: true,
        },
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      activate: {
        type: Sequelize.BOOLEAN,
        default:false,
      },
      salt: {
        type: Sequelize.STRING
      },
      blocked: {
        type: Sequelize.BOOLEAN,
        default:false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};