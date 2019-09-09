import mongoose from 'mongoose';

const { Schema } = mongoose;

const Article = new mongoose.Schema({
  title: String,
  markdown: String,
  content: String,
  categories: [String],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  public: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

Article.statics = {
  list(options = {}) {
    const { page = 0, perPage = 10, ...criteria } = options;
    return this.find(criteria)
      .sort({ createdAt: -1 })
      .limit(perPage)
      .skip(perPage * page)
      .populate('author')
      .exec();
  },
};

export default mongoose.model('Article', Article);
