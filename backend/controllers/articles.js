/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "_doc"] }] */

const mongoose = require('mongoose');
const Article = require('../models/Article');

const list = async ctx => {
  const { page, perPage } = ctx.query;
  const articles = await Article.list({
    page: +page - 1,
    perPage: +perPage,
    public: true,
  });
  ctx.body = articles;
};

const get = async ctx => {
  const { id } = ctx.params;
  // TODO validate
  if (!ctx.params.id) {
    ctx.throw(400);
    return;
  }

  const article = await Article.findById(id);
  ctx.body = article;
};

const create = async ctx => {
  // TODO validate
  if (!ctx.request.body.content || !ctx.request.body.markdown) {
    ctx.throw(400);
    return;
  }

  const article = await Article.create({
    ...ctx.request.body,
    author: mongoose.Types.ObjectId(ctx.session.user._id),
  });
  ctx.body = article;
};

const update = async ctx => {
  // TODO validate
  const { body } = ctx.request;
  if (!body.id || !body.content || !body.markdown) {
    ctx.throw(400);
    return;
  }

  const article = await Article.findByIdAndUpdate(body.id, body);
  ctx.body = article;
};

const remove = async ctx => {
  // TODO validate
  const article = await Article.findById(ctx.params.id);
  if (ctx.session.user._id !== article.author.toString()) {
    ctx.throw(403);
    return;
  }

  await article.remove();
  ctx.body = article;
};

module.exports = {
  list,
  get,
  create,
  update,
  remove,
};
