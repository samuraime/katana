import { Middleware } from 'koa';
import Archive from '../models/Archive';
import qiniu from '../config/qiniu';
import upload from './upload';

const index: Middleware = async ctx => {
  const { per_page: perPage = 10000, page = 0 } = ctx.query;
  const criteria = { perPage, page };
  const archives = await Archive.list(criteria);
  ctx.body = archives.map(a => ({
    ...a.toObject(),
    link: `${qiniu.domain}/${a.key || a.hash}`,
  }));
};

const get: Middleware = async ctx => {
  const { id } = ctx.params;
  try {
    const archive = await Archive.findById(id);
    ctx.response.body = archive;
  } catch (e) {
    ctx.status = 404;
  }
};

const update: Middleware = async ctx => {
  const { id } = ctx.params;
  const updateData = ctx.request.body;
  const archive = await Archive.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );
  ctx.response.body = archive;
};

const remove: Middleware = async ctx => {
  const { id } = ctx.params;
  const archive = await Archive.findByIdAndRemove(id);
  await upload.remove(archive.hash);
  ctx.body = archive;
};

const create: Middleware = async ctx => {
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

export default {
  index,
  get,
  update,
  create,
  remove,
};
