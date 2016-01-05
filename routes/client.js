var express = require('express');
var router = express.Router();
/*
 * 获取所有主机列表, 以 json 形式发送
 */
router.get('/', (req, res) => {

});

/*
 * 修改 id 为 req.param.id 的主机名字, 主机名字放在 req.body.name 中
 */
router.put('/:id', (req, res) => {

});

/*
 * 获取 主机的所有状态
 */
router.get('/:id/state', (req, res) => {

});

/*
 * ping 主机, id 为 req.param.id
 */
router.get('/:id/ping', (req, res) => {

});

module.exports = router;
