import Router from 'koa-router';
import dev from '../features/dev';

const router = new Router();

router.get('/long-live-the-code', dev.longLiveTheCode);

export default router;
