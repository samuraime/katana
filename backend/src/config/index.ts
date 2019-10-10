import path from 'path';

export default {
  env: process.env.NODE_ENV || 'production',
  db: process.env.DB,
  port: process.env.PORT,
  publicPath: path.resolve(__dirname, '../../../frontend/build'),
  frontendEntry: path.resolve(__dirname, '../../../frontend/build/index.html'),
  jwtSecret: process.env.JWT_SECRET,
  home: process.env.SITE_HOME, // https://samuraime.com
  keys: process.env.APP_KEYS ? process.env.APP_KEYS.split(' ') : [],
};
