import Router from 'koa-router';
import api from './api';
import auth from './auth';
import dev from './dev';
import SPA from '../middlewares/SPA';

const router = new Router();

router.use('/api', api.routes());
router.use('/auth', auth.routes(), api.allowedMethods());
router.use('/dev', dev.routes());
router.get('/*', SPA);

export default router.routes();
