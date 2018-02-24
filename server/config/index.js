const path = require('path');

const env = process.env.NODE_ENV || 'production';

module.exports = {
  env,
  db: process.env.DB || 'mongodb://localhost/katana',
  port: process.env.PORT || 3000,
  staticPath: path.resolve(__dirname, '../../client/dist'),
  viewPath: path.resolve(__dirname, '../../client/dist'),
  jwtSecret: process.env.JWT_SECRET || 'samurai/katana',
  email: 'katana@samuraime.com',
  password: '000000',
};
