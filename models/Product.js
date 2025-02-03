const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idCategory: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  reference: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  productName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  weight: {
    type: DataTypes.DECIMAL(10, 5),
    allowNull: false,
  },
  img: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  tableName: 'product', 
  timestamps: false,     
});

module.exports = Product;
