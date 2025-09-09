const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./productModel');

// Sequelize-based Order model to match controller usage
const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products', // table name
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Orders',
  timestamps: true, // createdAt/updatedAt
});

Order.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = Order;
