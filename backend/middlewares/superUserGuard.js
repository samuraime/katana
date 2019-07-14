const superUserGuard = async (ctx, next) => {
  const { user } = ctx.session;
  if (!user || !user.superUser) {
    ctx.throw(403);
    return;
  }

  await next();
};

module.exports = superUserGuard;
