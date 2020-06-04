'use strict';
const { hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email cannot be empty'
          }
        }
    },
    password: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password cannot be empty'
          }
        }
    },
    role: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['User', 'Admin']],
            msg: 'Role must be User or Admin'
          }
        }
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        return hash(instance.password)
          .then(hashed => {
            instance.password = hashed;
          });
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};