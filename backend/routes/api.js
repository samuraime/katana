const Router = require('koa-router');
const body = require('koa-body');
const koaJwt = require('koa-jwt');
const config = require('../config');
const auth = require('../controllers/auth');
const archives = require('../controllers/archives');
const upload = require('../controllers/upload');
const APIError = require('../middlewares/api-error');

const router = new Router({ prefix: '/api' });

router.use(body());

// handle all uncaught exceptions
router.use(APIError);

router.post('/login', auth.login);
router.get('/archives', archives.list);
router.get('/archives/:id', archives.find);

// following routes need to jwt auth
router.use(koaJwt({ secret: config.jwtSecret }));

router.get('/upload/token', upload.getToken);

router.post('/logout', auth.logout);
router.post('/autologin', auth.autoLogin);

router.put('/archives/:id', archives.update);
router.delete('/archives/:id', archives.destory);
router.post('/archives', archives.create);

module.exports = router;
