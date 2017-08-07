const mongoose = require('mongoose');

const { Schema } = mongoose;

const Bookmark = new Schema({
  title: String,
  link: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

Bookmark.statics = {
  list(options = {}) {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || 100;
    return this.find(criteria)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page)
      .exec();
  },
};

mongoose.model('Bookmark', Bookmark);
