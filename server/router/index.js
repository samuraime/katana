const fs = require('fs');
const { join } = require('path');
const Router = require('koa-router');
const config = require('../config');

const router = new Router();

router.get('/*', (ctx) => {
  ctx.body = fs.createReadStream(join(config.viewPath, 'index.html'));
  ctx.type = 'text/html';
});

module.exports = router;
