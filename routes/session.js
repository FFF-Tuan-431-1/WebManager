var express = require('express');
var router = express.Router();
var User = require('../models/user');
var middleware = require('./middleware');

router.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({
    where: {
      username: username
    }
  }).then(function(user) {
    if (!user || user.password !== password) {
      return res.status(400).json({error: '用户名或密码错误'});
    }

    req.session.userId = user.id;
    res.send(200);
  });
});


router.get('/test', middleware.needLogin, function(req, res) {
  var userId = req.session.userId;
  if (!userId) {
    return res.status(400).json({error: '未登录'});
  }
  User.findOne({where: {id: userId}}).then((user) => {
    if (!user) {
      return res.status(400).json({error: '未登录'});
    }

    res.status(200).send('your username is ' + user.username);
  });
});

module.exports = router;
