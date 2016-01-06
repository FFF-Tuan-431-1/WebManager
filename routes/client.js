var express = require('express');
var router = express.Router();
var Client = require('../models/client').Client;
var ping = require("net-ping");
var debug = require('debug')('wm:routes:client');

/*
 * 获取所有主机列表, 以 json 形式发送
 */
router.get('/', (req, res) => {
  Client.findAll().then(clients => {
    if (!clients) {
      return res.status(400).json({error: 'clients is not exist'})
    }
    res.status(200).json(clients);
  })
});

/*
 * 修改 id 为 req.param.id 的主机名字, 主机名字放在 req.body.name 中
 */
router.put('/:id', (req, res) => {
  Client.findOne({where: {id: req.params.id}}).then(client => {
    if (!client) {
      return res.status(400).json({error: 'client is not exist'})
    }
    client.name = req.body.name;
    client.save().then(() => res.sendStatus(200));
  })
});

/*
 * 获取 主机的所有状态
 */
router.get('/:id/state', (req, res) => {
  Client.findOne({where: {id: req.params.id}}).then(client => {
    if (!client) {
      return res.status(400).json({error: 'client is not exist'})
    }
    return client.getStates();
  }).then((states) => {
    res.status(200).json(states);
  })
});

/*
 * ping 主机, id 为 req.param.id
 */
router.get('/:id/ping', (req, res) => {
  Client.findOne({where: {id: req.params.id}}).then(client => {
    if (!client) {
      return res.status(400).json({error: 'client is not exist'})
    }
    return client.getStates();
  }).then((states) => {
    if (!states) {
      return res.status(400).json({error: 'not knowing its ip'});
    }
    var ip = states.pop().ip;
    var session = ping.createSession();
    debug('ping ' + ip + ' ...');
    session.pingHost(ip, function (error, target, s, r) {
      if (error){
        return res.status(400).json({error: error});
      }
      res.status(200).json({time: r - s});
    });
  })
});

/*
 * ping 特定 ip
 * ip 放在 req.body 中
 */
router.post('/ping', (req, res) => {
  var ip = req.body.ip;
  var session = ping.createSession();
  debug('ping ' + ip + ' ...');
  session.pingHost(ip, function (error, target, s, r) {
    if (error){
      return res.status(400).json({error: error});
    }
    res.status(200).json({time: r - s});
  });
});

module.exports = router;
