import { Middleware } from 'koa';

const getToken: Middleware = ctx => {
  ctx.body = {
    token: 'faketoken',
  };
};

const remove = async (key: string): Promise<any> => {
  return { key };
};

export default {
  remove,
  getToken,
};
