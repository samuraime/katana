export default {
  env: process.env.NODE_ENV || 'production',
  db: process.env.DB,
  port: process.env.PORT,
  publicPath: process.env.PUBLIC_PATH,
  clientVersionsPath: process.env.CLIENT_VERSIONS_PATH,
  clientVersion: process.env.CLIENT_VERSION,
  jwtSecret: process.env.JWT_SECRET,
  home: process.env.SITE_HOME, // https://samuraime.com
  keys: process.env.APP_KEYS ? process.env.APP_KEYS.split(' ') : [],
};
