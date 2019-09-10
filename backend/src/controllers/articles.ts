/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "_doc"] }] */

import { Middleware } from 'koa';
import mongoose from 'mongoose';
import Article from '../models/Article';

const list: Middleware = async ctx => {
  const { page, perPage } = ctx.query;
  const articles = await Article.list({
    page: +page - 1,
    perPage: +perPage,
    public: true,
  });
  ctx.body = articles;
};

const get: Middleware = async ctx => {
  const { id } = ctx.params;
  // TODO validate
  if (!ctx.params.id) {
    ctx.throw(400);
    return;
  }

  const article = await Article.findById(id);
  ctx.body = article;
};

const create: Middleware = async ctx => {
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

const update: Middleware = async ctx => {
  // TODO validate
  const { body } = ctx.request;
  if (!body.id || !body.content || !body.markdown) {
    ctx.throw(400);
    return;
  }

  const article = await Article.findByIdAndUpdate(body.id, body);
  ctx.body = article;
};

const remove: Middleware = async ctx => {
  // TODO validate
  const article = await Article.findById(ctx.params.id);
  if (ctx.session.user._id !== article.author.toString()) {
    ctx.throw(403);
    return;
  }

  await article.remove();
  ctx.body = article;
};

export default {
  list,
  get,
  create,
  update,
  remove,
};
