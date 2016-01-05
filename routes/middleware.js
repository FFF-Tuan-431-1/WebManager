var User = require('../models/user');

// 这个中间件是验证登录的中间件
// 加载之后,如果登录了,会把 user 对象绑定到 req 上
var needLogin = function (req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({error: '未登录'});
  }
  User.findOne({where: {id: req.session.userId}}).then((user) => {
    if (!user) {
      return res.status(401).json({error: '未登录'});
    }
    req.user = user;
    next();
  });
};

module.exports = {
  needLogin
};