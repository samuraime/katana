const Router = require('koa-router');
const body = require('koa-body');
const koaJwt = require('koa-jwt');
const config = require('../config');
const auth = require('../controllers/auth');
const bookmarks = require('../controllers/bookmarks');
const archives = require('../controllers/archives');
const upload = require('../controllers/upload');
const APIError = require('../middlewares/api-error');

const router = new Router({ prefix: '/api' });

router.use(body());

// handle all uncaught exceptions
router.use(APIError);

router.post('/login', auth.login);

router.get('/bookmarks', bookmarks.list);
router.get('/bookmarks/:id', bookmarks.find);

// following routes need to jwt
router.use(koaJwt({ secret: config.jwtSecret }));

router.get('/upload/token', upload.getToken);

router.post('/logout', auth.logout);
router.post('/autologin', auth.autoLogin);

router.post('/bookmarks', bookmarks.create);
router.put('/bookmarks/:id', bookmarks.update);
router.delete('/bookmarks/:id', bookmarks.destory);

router.get('/archives', archives.list);
router.get('/archives/:id', archives.find);
router.get('/archives/:id/download', archives.findDownload);
router.put('/archives/:id', archives.update);
router.delete('/archives/:id', archives.destory);
router.post('/archives', archives.create);

module.exports = router;
