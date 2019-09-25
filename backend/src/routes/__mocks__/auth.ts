import Router from 'koa-router';
import User from '../../models/User';

const router = new Router();

router.get('/github/callback', async ctx => {
  const { query } = ctx;
  const user = await User.create({
    githubID: 2203205,
    avatar: 'https://avatars1.githubusercontent.com/u/2203205?v=4',
    email: 'samurai7@foxmail.com',
    login: 'samuraime',
    name: 'SamuraiMe',
    superUser: !!query.superUser,
  });
  ctx.session.user = user;

  ctx.redirect('/');
});

export default router;
