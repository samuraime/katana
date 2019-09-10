import { Middleware } from 'koa';
import logger from '../utils/logger';

const handle: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    logger.info('API', {
      URL: ctx.url,
      Method: ctx.method,
      Headers: ctx.headers,
      Body: ctx.request.body,
      message: e.message,
      stack: e.stack,
    });
    ctx.status = e.status || 500;
    ctx.body = {
      message: e.message,
    };
  }
};

export default handle;
