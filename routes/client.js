var express = require('express');
var router = express.Router();
var Client = require('../models/client').Client;
var State = require('../models/client').State;
var ping = require("net-ping");
var debug = require('debug')('wm:routes:client');
var getmac = require('getmac');
var session = ping.createSession();

/*
* 往主机列表中增加一个特定主机，
* mac 为 req.body.mac,
* 主机名 为 req.body.name
*/
router.post('/', (req, res) => {
  var mac = req.body.mac;
  var name = req.body.name;

  if(getmac.isMac(mac)){
    mac = mac.trim().toUpperCase();
    mac = mac.replace(/:/g, '-');
  }else{
    return res.status(400).json({error: 'mac is wrong'});
  }
  Client.create({name, mac}).then(client => {
    res.sendStatus(200);
  }).catch(err => {
    //mac地址和主机名任一重复时发生错误
    res.status(400).json(err);
  });
});

/*
*搜索特定主机
* 主机名:req.query.name
*/
router.get('/search',(req, res) => {
  var name = req.query.name;
  Client.findOne({where: {name: name}}).then(client => {
    if(!client) {
      return res.status(400).json({error: 'client is not exist'});
    }
    res.status(200).json({id: client.id});
  });
});

/*
 * 获取所有主机列表, 以 json 形式发送
 */
router.get('/', (req, res) => {
  Client.findAll().then(clients => {
    if (!clients) {
      return res.status(400).json({error: 'clients is not exist'});
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
      return res.status(400).json({error: 'client is not exist'});
    }
    client.name = req.body.name;
    client.save().then(() => res.sendStatus(200));
  })
});

/*
 * 删除 id 为 req.param.id 的主机名字
 */
router.delete('/:id', (req, res) => {
  State.destroy({where: {clientId: req.params.id}}).then(() => {
    return Client.destroy({where: {id: req.params.id}});
  }).then(() => {
    res.sendStatus(200);
  });
});

/*
 * 获取 主机的所有状态
 */
router.get('/:id/state', (req, res) => {
  Client.findOne({where: {id: req.params.id}}).then(client => {
    if (!client) {
      return res.status(400).json({error: 'client is not exist'});
    }
    return client.getStates();
  }).then((states) => {
    res.status(200).json(states);
  });
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
    if (states.length === 0) {
      return res.status(400).json({error: {message: '该主机没有历史IP'}});
    }
    var ip = states.pop().ip;
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
  debug('ping ' + ip + ' ...');
  session.pingHost(ip, function (error, target, s, r) {
    if (error){
      return res.status(400).json({error: error});
    }
    res.status(200).json({time: r - s});
  });
});

module.exports = router;


