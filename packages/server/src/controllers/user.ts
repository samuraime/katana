import { Middleware } from 'koa';
// import jwt from 'jsonwebtoken';
// import config from '../config';

const getUser: Middleware = (ctx) => {
  const { user } = ctx.session;
  ctx.body = user || {};
};

// const login = (ctx) => {
//   const { email, password } = ctx.request.body;

//   if (email === config.email && password === config.password) {
//     const token = jwt.sign({ email }, config.jwtSecret);
//     ctx.body = { token };
//   } else {
//     ctx.throw(401);
//   }
// };

// const logout = (ctx) => {
//   // TODO: revoke token
//   ctx.status = 204;
// };

// const autoLogin = (ctx) => {
//   // TODO: generate new token
//   ctx.body = {
//     token: ctx.get('authorization').split(' ')[1],
//     email: config.email,
//   };
// };

const signOut: Middleware = (ctx) => {
  ctx.session.user = null;
  ctx.status = 204;
};

export default {
  getUser,
  signOut,
};
