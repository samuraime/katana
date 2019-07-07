const logger = require('../utils/logger');

const handle = async (ctx, next) => {
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

module.exports = handle;
