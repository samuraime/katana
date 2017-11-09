const mongoose = require('mongoose');
const qiniu = require('../config/qiniu');
const upload = require('./upload');

const Archive = mongoose.model('Archive');

const list = async (ctx) => {
  const archives = await Archive.list();
  ctx.body = archives.map(a => ({ ...a.toObject(), link: `${qiniu.domain}/${a.hash}` }));
};

const find = async (ctx) => {
  const { id } = ctx.params;
  const archive = await Archive.findById(id);
  ctx.response.body = archive;
};

const update = async (ctx) => {
  const { id } = ctx.params;
  const updateData = ctx.request.body;
  await Archive.findByIdAndUpdate(id, updateData);
  ctx.response.body = true;
};

const destory = async (ctx) => {
  const { id } = ctx.params;
  const archive = await Archive.findByIdAndRemove(id);
  await upload.destory(archive.hash);
  ctx.status = 204;
};

const create = async (ctx) => {
  const {
    name, size, type, hash,
  } = ctx.request.body;
  const archive = new Archive({
    name,
    size,
    type,
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
