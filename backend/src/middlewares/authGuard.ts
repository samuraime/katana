import { Middleware } from 'koa';

const authGuard: Middleware = async (ctx, next) => {
  const { user } = ctx.session;
  if (!user) {
    ctx.throw(403);
    return;
  }

  await next();
};

export default authGuard;
