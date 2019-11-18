/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "_doc"] }] */

import { Middleware } from 'koa';
import mongoose from 'mongoose';
import Article from '../models/Article';
import contentService from '../services/github/content';

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

const update: Middleware = async ctx => {
  const { body } = ctx.request;
  const { id, title, markdown, draft, isPublish } = body;

  if (!title && !markdown && !draft) {
    ctx.throw(400);
    return;
  }

  const yume = await Article.create({
    ...ctx.request.body,
    dreamer: mongoose.Types.ObjectId(ctx.session.user._id),
  });

  const article = id
    ? await Article.findByIdAndUpdate(
        id,
        // @TODO check whether update document id
        body,
        {
          new: true,
        }
      )
    : await Article.create({
        ...body,
        author: mongoose.Types.ObjectId(ctx.session.user._id),
      });

  if (isPublish) {
    const operation = article.file ? 'update' : 'create';
    const {
      content: { name, path, sha },
    } = await contentService.update(`${article.title}.md`, {
      message: `${operation}: ${article.title}`,
      content: markdown,
      sha: article.file ? article.file.sha : undefined,
    });

    article.file = { name, path, sha };
    await article.save();
  }

  ctx.body = article;
};

const remove: Middleware = async ctx => {
  // TODO validate
  const article = await Article.findById(ctx.params.id);

  if (ctx.session.user._id !== article.author.toString()) {
    ctx.throw(403);
    return;
  }

  await Promise.all([
    article.remove(),
    contentService.remove(article.file.path, {
      sha: article.file.sha,
      message: `delete: ${article.file.name}`,
    }),
  ]);

  ctx.body = article;
};

export default {
  index,
  get,
  update,
  remove,
};
