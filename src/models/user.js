'use strict';
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
const models = require('./index')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    phone: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    token: DataTypes.STRING,
    activate: {
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    salt: DataTypes.STRING,
    blocked: {
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async user => {
    user.salt = uuidv4()
    const hashedPassword = await User.generatePasswordHash(user.password, user.salt)
    user.password = hashedPassword
  });

  User.generatePasswordHash = async function(password, salt) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  };

  User.validatePassword = async function(password, salt, hashedPassword){
    const user = await User.generatePasswordHash(password, salt) === hashedPassword;
    return user
  }

  User.Activate = async (token) =>{
    let user = await User.findOne({
      where:{token}
    })
    if(!user){
      return {error:"Invalid token"}
    }
    // const data =  await User.update({token:"", activate:true}, {where:{id:user.id}})
    await User.update({activate:true}, {where:{id:user.id}})
    // let wallet = await models.Wallet.create({user_id:user.id})
    // console.log({user, wallet})
    return user
  }

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { email: login },
    });
    if (!user) {
      user = await User.findOne({
        where: { phone: login },
      });
    }
    return user;
  };

  User.findByToken = async token => {
    let user = await User.findOne({
      where: { token },
    });
    return user;
  };

  User.resetPassword = async data => {
    let salt = uuidv4()
    const password = await User.generatePasswordHash(data.password, salt)
    const {token, id} =data
    return  await User.update({password, salt, token}, {where:{id}})
  };
  return User;
};