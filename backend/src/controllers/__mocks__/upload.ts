import { Middleware } from 'koa';

const getToken: Middleware = ctx => {
  ctx.body = {
    token: 'faketoken',
  };
};

const destory = async (key: string) => {
  return { key };
};

export default {
  destory,
  getToken,
};
