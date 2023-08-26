/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "_doc"] }] */

import { Middleware } from 'koa';
import mongoose from 'mongoose';
import Yume from '../models/Yume';

const index: Middleware = async (ctx) => {
  const { page, perPage } = ctx.query;
  const yumes = await Yume.list({
    page: +page - 1,
    perPage: +perPage,
    public: true,
  });
  ctx.body = yumes;
};

const create: Middleware = async (ctx) => {
  // TODO validate
  if (!ctx.request.body.text) {
    ctx.throw(400);
  }

  const yume = await Yume.create({
    ...ctx.request.body,
    dreamer: mongoose.Types.ObjectId(ctx.session.user._id),
  });
  const yumeWithDreamer = await yume.populate('dreamer').execPopulate();
  ctx.body = yumeWithDreamer;
};

const remove: Middleware = async (ctx) => {
  // TODO validate
  const yume = await Yume.findById(ctx.params.id);
  if (ctx.session.user._id !== yume.dreamer.toString()) {
    ctx.throw(403);
  }

  await yume.remove();
  ctx.body = yume;
};

const getCalendar: Middleware = async (ctx) => {
  const end = new Date();
  const start = new Date(end);
  start.setFullYear(end.getFullYear() - 1);
  const records = await Yume.find({
    createdAt: {
      $gte: start,
      $lte: end,
    },
  })
    .sort({ createdAt: -1 })
    .limit(1000)
    .select({ type: true, createdAt: true });

  ctx.body = records;
};

export default {
  index,
  create,
  remove,
  getCalendar,
};
