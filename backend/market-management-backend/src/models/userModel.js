const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // createdAt and updatedAt will be handled automatically
});

// Method to find a user by username
User.findByUsername = async function (username) {
  return await this.findOne({ where: { username } });
};

// Method to create a new user
User.createUser = async function (userData) {
  return await this.create(userData);
};

module.exports = User;