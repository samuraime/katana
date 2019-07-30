/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "_doc"] }] */

const mongoose = require('mongoose');
const Yume = require('../models/Yume');
const User = require('../models/User');

const list = async ctx => {
  const { page, perPage } = ctx.query;
  const yumes = await Yume.list({
    page: +page - 1,
    perPage: +perPage,
    public: true,
  });
  ctx.body = yumes;
};

const create = async ctx => {
  // TODO validate
  if (!ctx.request.body.text) {
    ctx.throw(400);
    return;
  }

  const yume = await Yume.create({
    ...ctx.request.body,
    dreamer: mongoose.Types.ObjectId(ctx.session.user._id),
  });
  const yumeWithDreamer = await yume.populate('dreamer').execPopulate();
  ctx.body = yumeWithDreamer;
};

const remove = async ctx => {
  // TODO validate
  const yume = await Yume.findById(ctx.params.id);
  if (ctx.session.user._id !== yume.dreamer.toString()) {
    ctx.throw(403);
    return;
  }

  await yume.remove();
  ctx.body = yume;
};

const posts = async ctx => {
  // const { page, perPage } = ctx.query;
  const { posts: yumes } = await User.findById(ctx.session.user._id, {
    posts: true,
  })
    .populate({
      path: 'posts',
      populate: {
        path: 'dreamer',
      },
    })
    .exec();
  ctx.body = yumes.map(yume => ({
    ...yume._doc,
    starred: true,
    thumbupped: yume.thumbuppers.includes(ctx.session.user._id),
  }));
};

const starred = async ctx => {
  // const { page, perPage } = ctx.query;
  const { stars: yumes } = await User.findById(ctx.session.user._id, {
    stars: true,
  })
    .populate({
      path: 'stars',
      populate: {
        path: 'dreamer',
      },
    })
    .exec();
  ctx.body = yumes.map(yume => ({
    ...yume._doc,
    starred: true,
    thumbupped: yume.thumbuppers.includes(ctx.session.user._id),
  }));
};

const star = async ctx => {
  const { id } = ctx.params;
  const [yume] = await Promise.all([
    Yume.findByIdAndUpdate(
      id,
      {
        $inc: {
          stars: 1,
        },
      },
      {
        new: true,
        select: {
          stars: true,
        },
      }
    ),
    User.findByIdAndUpdate(ctx.session.user._id, {
      $addToSet: {
        stars: mongoose.Types.ObjectId(id),
      },
    }),
  ]);
  ctx.body = {
    stars: yume.stars,
    starred: true,
  };
};

const unstar = async ctx => {
  const { id } = ctx.params;
  const [yume] = await Promise.all([
    Yume.findByIdAndUpdate(
      id,
      {
        $inc: {
          stars: -1,
        },
      },
      {
        new: true,
        select: {
          stars: true,
        },
      }
    ),
    User.findByIdAndUpdate(ctx.session.user._id, {
      $pull: {
        stars: mongoose.Types.ObjectId(id),
      },
    }),
  ]);
  ctx.body = {
    stars: yume.stars,
    starred: false,
  };
};

module.exports = {
  list,
  create,
  remove,
  posts,
  starred,
  star,
  unstar,
};
