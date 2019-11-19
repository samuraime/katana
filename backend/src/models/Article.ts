import { Document, model, Model, Schema } from 'mongoose';
import { UserDocument } from './User';

interface ArticleDocument extends Document {
  title: string;
  markdown: string;
  draft: string;
  html: string;
  categories: string[];
  author: UserDocument;
  public: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ArticleModel extends Model<ArticleDocument> {
  list: (criteria: ArticleSearchCriteria) => Promise<ArticleDocument[]>;
}

interface ArticleSearchCriteria extends SearchCriteria {
  public?: boolean;
}

const articleSchema = new Schema({
  title: String,
  markdown: String,
  draft: String,
  html: String,
  categories: [String],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  public: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

articleSchema.statics = {
  list(options: ArticleSearchCriteria = {}) {
    const { page = 0, perPage = 10, ...criteria } = options;
    return this.find(criteria)
      .sort({ createdAt: -1 })
      .limit(perPage)
      .skip(perPage * page)
      .populate('author')
      .exec();
  },
};

export default model<ArticleDocument, ArticleModel>('Article', articleSchema);
