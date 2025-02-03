const { DataTypes } = require('sequelize');
const sequelize = require('../db');  // Certifique-se de que o caminho está correto

const Order = sequelize.define('Order', {
  customerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pendente'
  },
  products: {
    type: DataTypes.JSON,  
    allowNull: false
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Order;
