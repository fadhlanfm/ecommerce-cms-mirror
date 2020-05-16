'use strict';
const { generateHashedPassword } = require('../helpers/crypt')

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: `Email can not be null`
      },
      validate: {
        isEmail: {
          msg: `Please enter the correct email address`
        },
        notEmpty: {
          args: true,
          msg: `Please enter your email`
        }
      },
      unique: {
        args: true,
        msg: `Email is already in use. Please use another email`
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: `Password can not be null`
      },
      validate: {
        notEmpty: {
          args: true,
          msg: `Please enter your password`
        }
      }
    }
  }, { sequelize })

  User.beforeCreate((user, option) => {
    user.password = generateHashedPassword(user.password)
    user.organization = 'Hacktiv8'
  })
  
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};