const mongoose = require('mongoose');

const ArchiveSchema = new mongoose.Schema({
  name: String,
  path: String,
  size: Number,
  mimetype: String,
  tags: Array,
  comment: { type: String, default: '' },
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
