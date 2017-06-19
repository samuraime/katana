/* eslint no-console: 0 */

const Koa = require('koa');
const helmet = require('koa-helmet');
const staticServe = require('koa-static');
const body = require('koa-parse-json');
const cors = require('kcors');
const mongoose = require('mongoose');
const config = require('./config');
const webRouter = require('./router');
const apiRouter = require('./router/api');

const app = new Koa();
mongoose.Promise = global.Promise;

app.use(helmet());

app.use(staticServe(config.staticPath));

app.use(body());

app.use(cors());

app.use(webRouter.routes());
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

const listen = () => {
  app.listen(config.port);
  console.log(`Listening on port ${config.port}`);
};

const connect = () => {
  const options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(config.db, options).connection;
};

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);
