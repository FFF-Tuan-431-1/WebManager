var User = require('../models/user');

var needLogin = function (req, res, next) {
  if (!req.session.userId) {
    return res.status(400).json({error: '未登录'});
  }
  User.findOne({where: {id: req.session.userId}}).then((user) => {
    if (!user) {
      return res.status(400).json({error: '未登录'});
    }
    req.user = user;
    next();
  });
};

module.exports = {
  needLogin
};