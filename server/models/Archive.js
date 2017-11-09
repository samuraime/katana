const mongoose = require('mongoose');

const ArchiveSchema = new mongoose.Schema({
  name: String,
  size: Number,
  type: String,
  hash: String,
  tags: Array,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

ArchiveSchema.statics = {
  list(options = {}) {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || 1000;
    return this.find(criteria)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page)
      .exec();
  },
};

mongoose.model('Archive', ArchiveSchema);
