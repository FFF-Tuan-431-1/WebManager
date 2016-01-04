var Sequelize = require('sequelize');

var db = new Sequelize('web_manager', 'root', null, {
  dialect: 'sqlite',
  storage: './database.sqlite'
});

module.exports = db;