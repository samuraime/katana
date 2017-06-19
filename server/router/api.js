const http = require('http');
const https = require('https');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const koaJwt = require('koa-jwt');
const config = require('../config');
const Bookmark = require('../models/Bookmark');

const jwtMiddleware = koaJwt({ secret: config.jwtSecret });
const router = new Router({ prefix: '/api' });

router.post('/login', (ctx) => {
  const email = ctx.request.body.email;
  const password = ctx.request.body.password;

  if (email === config.email && password === config.password) {
    ctx.body = { token: jwt.sign({ email }, config.jwtSecret) };
  } else {
    ctx.throw(403);
  }
});

router.get('/bookmarks', async (ctx) => {
  try {
    const bookmarks = await Bookmark.list();
    ctx.body = bookmarks;
  } catch (e) {
    ctx.throw(e);
  }
});

router.get('/bookmarks/:id', async (ctx) => {
  try {
    const id = ctx.params.id;
    const bookmark = await Bookmark.findById(id);
    ctx.body = bookmark;
  } catch (e) {
    ctx.throw(e);
  }
});

const getLinkInfo = link => new Promise((resolve, reject) => {
  const protocol = /^https/.test(link) ? https : http;
  protocol.get(link, (res) => {
    const { statusCode } = res;
    if (statusCode !== 200) {
      const error = new Error('Get Link Info Failed.');
      reject(error);
    }
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      const titles = rawData.match(/<title>([\s\S]*?)<\/title>/i);
      const descriptions = rawData.match(/<meta\s+name="description"\s+content="([\s\S]*?)"/i);
      resolve({
        title: titles ? titles[1] : '',
        description: descriptions ? descriptions[1] : '',
      });
    });
  }).on('error', (e) => {
    reject(e);
  });
});

router.post('/bookmarks', async (ctx) => {
  try {
    const { link } = ctx.request.body;
    const { title, description } = await getLinkInfo(link);
    const bookmark = new Bookmark({ title, description, link });
    await bookmark.save();
    ctx.body = bookmark;
  } catch (e) {
    ctx.throw(e);
  }
});

router.put('/bookmarks/:id', jwtMiddleware, async (ctx) => {
  try {
    const id = ctx.params.id;
    const update = ctx.request.body;
    const bookmark = await Bookmark.findByIdAndUpdate(id, update);
    ctx.body = bookmark;
  } catch (e) {
    ctx.throw(e);
  }
});

router.delete('/bookmarks/:id', async (ctx) => {
// router.delete('/bookmarks/:id', jwtMiddleware, async (ctx) => {
  try {
    const id = ctx.params.id;
    const bookmark = await Bookmark.findByIdAndRemove(id);
    ctx.body = bookmark;
  } catch (e) {
    ctx.throw(e);
  }
});

module.exports = router;
