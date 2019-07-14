const mongoose = require('mongoose');
const qiniu = require('../config/qiniu');
const upload = require('./upload');

const Archive = mongoose.model('Archive');

const list = async ctx => {
  const { per_page: limit = 10000, page = 0, name } = ctx.query;
  const criteria = { limit, page };
  if (name) {
    criteria.name = name;
  }
  const archives = await Archive.list(criteria);
  ctx.body = archives.map(a => ({
    ...a.toObject(),
    link: `${qiniu.domain}/${a.key || a.hash}`,
  }));
};

const find = async ctx => {
  const { id } = ctx.params;
  const archive = await Archive.findById(id);
  ctx.response.body = archive;
};

const update = async ctx => {
  const { id } = ctx.params;
  const updateData = ctx.request.body;
  await Archive.findByIdAndUpdate(id, updateData);
  ctx.response.body = true;
};

const destory = async ctx => {
  const { id } = ctx.params;
  const archive = await Archive.findByIdAndRemove(id);
  await upload.destory(archive.hash);
  ctx.body = archive;
};

const create = async ctx => {
  const { name, size, type, key, hash } = ctx.request.body;
  const archive = new Archive({
    name,
    size,
    type,
    key,
    hash,
  });
  await archive.save();
  ctx.response.body = archive;
};

module.exports = {
  list,
  find,
  update,
  create,
  destory,
};
