/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "_doc"] }] */

import { Middleware } from 'koa';
import mongoose from 'mongoose';
import Article from '../models/Article';

const index: Middleware = async ctx => {
  const { page, perPage } = ctx.query;
  const { user } = ctx.session;
  const isSuperUser = !!user && user.superUser;
  // TODO: refactor
  const condition = isSuperUser
    ? undefined
    : {
        draft: { $eq: '' },
      };

  const articles = await Article.list({
    page: +page - 1,
    perPage: +perPage,
    public: true,
    ...condition,
  });
  ctx.body = articles;
};

const get: Middleware = async ctx => {
  const { id } = ctx.params;
  const article = await Article.findById(id);
  ctx.body = article;
};

const create: Middleware = async ctx => {
  const { html, markdown, draft } = ctx.request.body;
  if (!html && !markdown && !draft) {
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
  const { id } = ctx.params;
  const { body } = ctx.request;
  const { markdown, draft } = body;
  if (!markdown && !draft) {
    ctx.throw(400);
    return;
  }

  const article = await Article.findByIdAndUpdate(id, body, { new: true });
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
  index,
  get,
  create,
  update,
  remove,
};
