const path = require('path');

const env = process.env.NODE_ENV || 'production';

module.exports = {
  env,
  db: process.env.DB,
  port: process.env.PORT || 3000,
  staticPath: path.resolve(__dirname, '../frontend/build'),
  frontendEntry: path.resolve(__dirname, '../frontend/build/index.html'),
  jwtSecret: process.env.JWT_SECRET,
  home: 'http://localhost:8000',
  keys: process.env.APP_KEYS ? process.env.APP_KEYS.split(' ') : [],
};
