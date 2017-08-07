const fs = require('fs');
const { join } = require('path');
const Koa = require('koa');
const helmet = require('koa-helmet');
const staticServe = require('koa-static');
const mount = require('koa-mount');
const cors = require('kcors');
const mongoose = require('mongoose');
const config = require('./config');

const app = new Koa();

// load all models
mongoose.Promise = global.Promise;
const models = join(__dirname, 'models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/)) // eslint-disable-line
  .forEach((file) => {
    require(join(models, file)); // eslint-disable-line
  });

// routes must be place after models
const apiRouter = require('./router/api');
const webRouter = require('./router');

// security headers
app.use(helmet());

// static files
app.use(mount('/static', staticServe(config.staticPath, {
  gzip: false,
})));

app.use(cors());

// apiRouter first, webRouter match all other routes
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());
app.use(webRouter.routes());

mongoose.connect('mongodb://localhost/katana', {
  useMongoClient: true,
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30,
})
  .then(() => {
    app.listen(config.port);
    console.log(`Listening on port ${config.port}`);
  })
  .catch(console.log);
