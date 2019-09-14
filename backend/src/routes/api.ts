import Router from 'koa-router';
import body from 'koa-body';
// import koaJwt from 'koa-jwt';
// import config from '../config';
import user from '../controllers/user';
import archives from '../controllers/archives';
import articles from '../controllers/articles';
import upload from '../controllers/upload';
import yumes from '../controllers/yumes';
import APIError from '../middlewares/APIError';
import authGuard from '../middlewares/authGuard';
import superUserGuard from '../middlewares/superUserGuard';

const router = new Router();

router.use(body());

// handle all uncaught exceptions
router.use(APIError);

// router.post('/login', auth.login);
router.get('/archives', archives.list);
router.get('/archives/:id', archives.find);
router.get('/articles', articles.list);
router.get('/articles/:id', articles.get);
// following routes need to jwt auth
// router.use(koaJwt({ secret: config.jwtSecret }));
router.get('/user', user.getUser);

// AUTH USER
router.use(authGuard);

router.get('/signout', user.signout);
// router.post('/logout', user.logout);
// router.post('/autologin', user.autoLogin);
router.get('/yumes', yumes.list);
router.post('/yumes', yumes.create);
router.delete('/yumes/:id', yumes.remove);
// router.get('/yumes/starred', yumes.starred);
// router.get('/yumes/posts', yumes.posts);
// router.put('/yume/starred/:id', yumes.star);
// router.delete('/yume/starred/:id', yumes.unstar);

// SUPER USER
router.use(superUserGuard);

router.get('/upload/token', upload.getToken);
router.put('/archives/:id', archives.update);
router.delete('/archives/:id', archives.destory);
router.post('/archives', archives.create);
router.post('/articles', articles.create);
router.put('/articles', articles.update);
router.delete('/articles/:id', articles.remove);

export default router;
