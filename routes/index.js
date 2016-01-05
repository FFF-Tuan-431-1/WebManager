var express = require('express');
var router = express.Router();
var middleware = require('./middleware');

/* GET home page. */
router.get('/', function(req, res) {
  if (req.user) {
    return res.redirect('/home');
  }
  res.render('index', { title: '网络管理系统' });
});

router.get('/home' ,(req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('home', {user: req.user});
});

router.get('/logout', middleware.needLogin, (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
