import Koa from 'koa';
import helmet from 'koa-helmet';
import staticServe from 'koa-static';
// import mount from 'koa-mount';
import session from 'koa-session';
import cors from 'kcors';
import config from './config';
import routes from './routes';

const app = new Koa();

app.keys = config.keys;

// security headers
app.use(helmet());

// static files
if (config.publicPath) {
  // app.use(mount('/static', staticServe(config.publicPath)));
  app.use(
    staticServe(config.publicPath, {
      index: false,
    })
  );
}

app.use(cors());

app.use(session(app));

app.use(routes);

export default app;
