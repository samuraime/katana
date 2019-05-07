const fs = require('fs');
const qs = require('querystring');
const Router = require('koa-router');
const http = require('../utils/http');
const config = require('../config');
const { github } = require('../config/auth');
const session = require('../constants/session');
const User = require('../models/User');

const router = new Router();

router.get('/auth/github', ctx => {
  const randomState = Math.random()
    .toString(36)
    .toUpperCase()
    .slice(2, 10);
  const { redirect_uri: redirect } = ctx.query;
  const params = {
    client_id: github.clientId,
    redirect_uri: `${config.home}/auth/github/callback?${qs.stringify({
      redirect_uri: redirect,
    })}`,
    login: '',
    scope: 'user',
    state: randomState,
    allow_signup: 'true',
  };

  ctx.session[session.githubOAuthState] = randomState;

  const query = qs.stringify(params);
  ctx.redirect(`https://github.com/login/oauth/authorize?${query}`);
});

router.get('/auth/github/callback', async ctx => {
  const { code, state, redirect_uri: redirectURI } = ctx.query;
  const storedState = ctx.session[session.githubOAuthState];
  if (state !== storedState) {
    throw new Error('auth failed');
  }

  const { clientId, clientSecret } = github;
  const params = {
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: '',
    code,
    state,
  };

  const { access_token: accessToken } = await http.post(
    'https://github.com/login/oauth/access_token',
    {
      query: params,
    }
  );

  const githubUser = await http.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  const { id, avatar_url: avatar, email, login, name } = githubUser;

  let user = await User.findOne({ id });
  if (!user) {
    user = await User.create({ id, avatar, email, login, name });
  }

  ctx.session[session.githubOAuthState] = null;
  ctx.session[session.user] = user;

  ctx.redirect(redirectURI || '/');
});

router.get('/*', async ctx => {
  ctx.body = fs.createReadStream(config.frontendEntry);
  ctx.type = 'text/html';
});

module.exports = router;
