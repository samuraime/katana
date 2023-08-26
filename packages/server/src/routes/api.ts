import Router from 'koa-router';
import body from 'koa-body';
// import koaJwt from 'koa-jwt';
// import config from '../config';
import user from '../controllers/user';
import archives from '../controllers/archives';
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
router.get('/archives', archives.index);
router.get('/archives/:id', archives.get);
// following routes need to jwt auth
// router.use(koaJwt({ secret: config.jwtSecret }));
router.get('/user', user.getUser);

// AUTH USER
router.use(authGuard);

router.get('/signout', user.signOut);
// router.post('/logout', user.logout);
// router.post('/autologin', user.autoLogin);
router.get('/yumes', yumes.index);
router.get('/yumes/calendar', yumes.getCalendar);

// SUPER USER
router.use(superUserGuard);

router.get('/upload/token', upload.getToken);
router.post('/yumes', yumes.create);
router.delete('/yumes/:id', yumes.remove);
router.put('/archives/:id', archives.update);
router.delete('/archives/:id', archives.remove);
router.post('/archives', archives.create);

export default router;
