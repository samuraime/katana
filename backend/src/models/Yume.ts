import mongoose from 'mongoose';

const { Schema } = mongoose;

const Yume = new mongoose.Schema({
  text: { type: String, default: '' },
  interpretation: { type: String, default: '' },
  images: [String],
  tags: [String],
  stars: { type: Number, default: 0 },
  stargazers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  dreamer: { type: Schema.Types.ObjectId, ref: 'User' },
  location: {
    name: String,
    longitude: Number,
    latitude: Number,
  },
  public: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

Yume.statics = {
  list(options = {}) {
    const { page = 0, perPage = 10, ...criteria } = options;
    return this.find(criteria)
      .sort({ createdAt: -1 })
      .limit(perPage)
      .skip(perPage * page)
      .populate('dreamer')
      .exec();
  },
};

export default mongoose.model('Yume', Yume);
