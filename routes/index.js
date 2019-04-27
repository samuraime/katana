const fs = require('fs');
const Router = require('koa-router');
const config = require('../config');

const router = new Router();

router.get('/*', async ctx => {
  ctx.body = fs.createReadStream(config.frontendEntry);
  ctx.type = 'text/html';
});

module.exports = router;
