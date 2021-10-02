'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Currencies', [
      {
        name: 'Nigeria Naira',
        symbol: 'NG',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'US Dollar',
        symbol: '$',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Currencies', null, {});
  }
};
