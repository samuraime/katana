const Router = require('koa-router');
const body = require('koa-body');
const koaJwt = require('koa-jwt');
const config = require('../config');
const auth = require('../controllers/auth');
const bookmarks = require('../controllers/bookmarks');
const APIError = require('../middlewares/api-error');

const router = new Router({ prefix: '/api' });

router.use(body());

// handle all uncaught exceptions
router.use(APIError);

router.post('/login', auth.login);

router.get('/bookmarks', bookmarks.list);
router.get('/bookmarks/:id', bookmarks.find);

// use jwt
router.use(koaJwt({ secret: config.jwtSecret }));

router.post('/logout', auth.logout);
router.post('/autologin', auth.autoLogin);

router.post('/bookmarks', bookmarks.create);
router.put('/bookmarks/:id', bookmarks.update);
router.delete('/bookmarks/:id', bookmarks.destory);

module.exports = router;
