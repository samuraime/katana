const mongoose = require('mongoose');

const ArchiveSchema = new mongoose.Schema({
  name: String,
  size: Number,
  type: String,
  hash: String,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

ArchiveSchema.statics = {
  list(options = {}) {
    const { page = 0, limit = 1000, ...criteria } = options;
    return this.find(criteria)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page)
      .exec();
  },
};

module.exports = mongoose.model('Archive', ArchiveSchema);
