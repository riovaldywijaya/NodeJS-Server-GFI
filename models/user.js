'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.STRING(21),
        primaryKey: true,
        field: 'ID',
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: 'Email is not valid' },
          is: {
            args: /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com|yahoo\.com)$/, 
            msg: 'Email is not valid',
          },
        },
        field: 'EMAIL',
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'PASSWORD',
        validate: {
          is: {
            args: /^(?=.*[A-Z])[A-Za-z0-9]{8,}$/,
            msg: 'Password must be at least 8 characters long, contain at least 1 uppercase letter, and cannot contain special characters',
          },
        },
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'NAME',
      },
      phoneNumber: {
        type: DataTypes.STRING(21),
        field: 'PHONE_NUMBER',
      },
      role: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'USER',
        field: 'ROLE',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'CREATED_AT',
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'UPDATED_AT',
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'USERS',
      timestamps: true,
      underscored: true,
      hooks: {
        beforeCreate: async (user) => {
          const { nanoid } = await import('nanoid'); 
          user.id = nanoid(); 
          user.password = hashPassword(user.password);
        },
      },
    }
  );
  return User;
};
