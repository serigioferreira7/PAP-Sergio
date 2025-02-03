const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');  // Caminho correto para sua instância do Sequelize

const Administrator = sequelize.define('Administrator', {
  name: {  
    type: DataTypes.STRING,
    allowNull: false,
  },
  pass: {  
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'administrator', 
  timestamps: false, 
});

module.exports = { Administrator };
