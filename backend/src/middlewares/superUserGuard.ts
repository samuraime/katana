import { Middleware } from 'koa';

const superUserGuard: Middleware = async (ctx, next) => {
  const { user } = ctx.session;
  if (!user || !user.superUser) {
    ctx.throw(403);
  }

  await next();
};

export default superUserGuard;
