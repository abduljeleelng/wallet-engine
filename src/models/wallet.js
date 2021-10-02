'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Wallet.init({
    user_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    currency_id:{
      type: DataTypes.INTEGER,
      defaultValue:1,
      // allowNull: false,
      // validate: {
      //   notEmpty: true,
      // },
    },
    balance: {
      type:DataTypes.FLOAT,
      allowNull: false,
      defaultValue:0.00,
      validate: {
        notEmpty: true,
      },
    },
    active:{
      type: DataTypes.BOOLEAN,
      defaultValue:true,
    }
  }, {
    sequelize,
    modelName: 'Wallet',
  });
  return Wallet;
};