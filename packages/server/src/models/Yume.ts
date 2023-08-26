import { Document, model, Model, Schema } from 'mongoose';
import { UserDocument } from './User';

interface YumeDocument extends Document {
  text: string;
  interpretation: string;
  images: string[];
  type: string;
  tags: string[];
  dreamer: UserDocument;
  location: {
    name: string;
    longitude: number;
    latitude: number;
  };
  public: boolean;
  createdAt: Date;
}

interface YumeModel extends Model<YumeDocument> {
  list: (criteria: YumeSearchCriteria) => Promise<YumeDocument[]>;
}

interface YumeSearchCriteria extends SearchCriteria {
  public?: boolean;
}

const yumeSchema = new Schema({
  text: { type: String, default: '' },
  interpretation: { type: String, default: '' },
  images: [String],
  type: { type: String, default: 'normal' },
  tags: [String],
  dreamer: { type: Schema.Types.ObjectId, ref: 'User' },
  location: {
    name: String,
    longitude: Number,
    latitude: Number,
  },
  public: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

yumeSchema.statics = {
  list(options: YumeSearchCriteria = {}) {
    const { page = 0, perPage = 10, ...criteria } = options;
    return this.find(criteria)
      .sort({ createdAt: -1 })
      .limit(perPage)
      .skip(perPage * page)
      .populate('dreamer')
      .exec();
  },
};

export default model<YumeDocument, YumeModel>('Yume', yumeSchema);
