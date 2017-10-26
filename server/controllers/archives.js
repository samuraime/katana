const mongoose = require('mongoose');

const Archive = mongoose.model('Archive');

const list = async (ctx) => {
  const archives = await Archive.list();
  ctx.body = archives;
};

const find = async (ctx) => {
  const { id } = ctx.params;
  const archive = await Archive.findById(id);
  ctx.response.body = archive;
};

const findDownload = async (ctx) => {
  try {
    const { id } = ctx.params;
    const archive = await Archive.findById(id);
    ctx.response.append('Content-Disposition', `attachment; filename=${archive.name}`);
    ctx.response.body = fs.createReadStream(archive.path);
  } catch (e) {
    ctx.throw(404);
  }
};

const update = async (ctx) => {
  const { id } = ctx.params;
  const updateData = ctx.request.body;
  await Archive.findByIdAndUpdate(id, updateData);
  ctx.response.body = true;
};

const destory = async (ctx) => {
  const id = ctx.params.id;
  const archive = await Archive.findByIdAndRemove(id);
  await unlink(archive.path);
  ctx.response.body = true;
};

const create = async (ctx) => {
  try {
    const file = ctx.req.file;
    const archive = new Archive({
      name: path.basename(file.originalname),
      size: file.size,
      path: file.path,
      mimetype: file.mimetype,
    });
    await archive.save();
    ctx.response.body = archive;
  } catch (e) {
    ctx.throw(e);
  }
};

module.exports = {
  list,
  find,
  update,
  create,
  destory,
  findDownload,
};
