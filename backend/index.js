import Koa from 'koa';
import helmet from 'koa-helmet';
import staticServe from 'koa-static';
// import mount from 'koa-mount';
import session from 'koa-session';
import cors from 'kcors';
import config from './config';
import connectMongo from './utils/connectMongo';
import apiRouter from './routes/api';
import webRouter from './routes';

connectMongo();

const app = new Koa();

// routes must be place after models

app.keys = config.keys;

// security headers
app.use(helmet());

// static files
// app.use(mount('/static', staticServe(config.publicPath)));
app.use(
  staticServe(config.publicPath, {
    index: false,
  })
);

app.use(cors());

app.use(session(app));

// apiRouter first, webRouter match all other routes
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());
app.use(webRouter.routes());

app.listen(config.port);
console.log(`Listening on port ${config.port}`);
