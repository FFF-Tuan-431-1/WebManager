var db = require('./db');
var Sequelize = require('sequelize');
var debug = require('debug')('wm:model:client');

/*
 * name 主机的名字, 需要默认生成一个随机的名字
 * mac 主机的 mac 地址
 */
var Client = db.define('client', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  mac: {
    type: Sequelize.STRING,
    unique: true,
    defaultValue: null
  }
});

var State = db.define('state', {
  ip: {
    type: Sequelize.STRING
  },
  time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  state: {
    type: Sequelize.ENUM,
    values: ['online', 'offline']
  }
});

Client.hasMany(State, {as: 'states'});

Client.sync().then(() => {
  debug('Client sync success');
});
State.sync().then(() => {
  debug('State sync success');
});

module.exports = {
  Client, State
};