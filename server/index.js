const Koa = require('koa');
const helmet = require('koa-helmet');
const staticServe = require('koa-static');
const mount = require('koa-mount');
const cors = require('kcors');
const config = require('./config');
const connect = require('./utils/connect');

// connect to mongodb
connect();

const app = new Koa();

// routes must be place after models
const apiRouter = require('./routes/api');
const webRouter = require('./routes');

// security headers
app.use(helmet());

// static files
app.use(mount('/static', staticServe(config.staticPath)));

app.use(cors());

// apiRouter first, webRouter match all other routes
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());
app.use(webRouter.routes());

app.listen(config.port);
console.log(`Listening on port ${config.port}`);
