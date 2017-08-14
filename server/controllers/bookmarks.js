const http = require('http');
const https = require('https');
const mongoose = require('mongoose');

const Bookmark = mongoose.model('Bookmark');

const list = async (ctx) => {
  const bookmarks = await Bookmark.list();
  ctx.body = bookmarks;
};

const find = async (ctx) => {
  const id = ctx.params.id;
  const bookmark = await Bookmark.findById(id);
  ctx.body = bookmark;
};

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

const create = async (ctx) => {
  const { link } = ctx.request.body;
  const { title, description } = await getLinkInfo(link);
  const bookmark = new Bookmark({ title, description, link });
  await bookmark.save();
  ctx.body = bookmark;
};

const update = async (ctx) => {
  const id = ctx.params.id;
  const updates = ctx.request.body;
  const bookmark = await Bookmark.findByIdAndUpdate(id, updates);
  ctx.body = bookmark;
};

const destory = async (ctx) => {
  const id = ctx.params.id;
  const bookmark = await Bookmark.findByIdAndRemove(id);
  ctx.body = bookmark;
};

module.exports = {
  list,
  find,
  create,
  update,
  destory,
};
