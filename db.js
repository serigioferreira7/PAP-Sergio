const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gestor_encomendas', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
