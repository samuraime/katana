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
      'Error Message': e.message,
      'Error Stack': e.stack,
    });
    ctx.throw(e);
  }
};

module.exports = handle;
