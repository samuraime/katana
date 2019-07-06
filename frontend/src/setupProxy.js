const proxy = require('http-proxy-middleware');

module.exports = function setup(app) {
  app.use(proxy('/api', { target: process.env.PROXY }));
  app.use(proxy('/auth', { target: process.env.PROXY }));
};
