'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Wallets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      currency_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        // validate: {
        //   notEmpty: true,
        // },
      },
      balance: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue:0.00,
        validate: {
          notEmpty: true,
        },
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue:true,
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
    await queryInterface.dropTable('Wallets');
  }
};