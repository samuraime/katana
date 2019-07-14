const Router = require('koa-router');
const body = require('koa-body');
// const koaJwt = require('koa-jwt');
// const config = require('../config');
const user = require('../controllers/user');
const archives = require('../controllers/archives');
const upload = require('../controllers/upload');
const APIError = require('../middlewares/APIError');
const authGuard = require('../middlewares/authGuard');
const superUserGuard = require('../middlewares/superUserGuard');

const router = new Router({ prefix: '/api' });

router.use(body());

// handle all uncaught exceptions
router.use(APIError);

// router.post('/login', auth.login);
router.get('/archives', archives.list);
router.get('/archives/:id', archives.find);

// following routes need to jwt auth
// router.use(koaJwt({ secret: config.jwtSecret }));

router.get('/user', user.getUser);

router.use(authGuard);

router.get('/signout', user.signout);

router.post('/logout', user.logout);
router.post('/autologin', user.autoLogin);

// only super user
router.use(superUserGuard);

router.get('/upload/token', upload.getToken);

router.put('/archives/:id', archives.update);
router.delete('/archives/:id', archives.destory);
router.post('/archives', archives.create);

module.exports = router;
