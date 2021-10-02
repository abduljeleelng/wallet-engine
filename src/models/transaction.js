'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Transaction.init({
    wallet_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    meta: DataTypes.STRING,
    type: DataTypes.STRING,
    confirmed: DataTypes.BOOLEAN,
    txn_id: DataTypes.UUID,
    amount: DataTypes.FLOAT,
    network_fee: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};