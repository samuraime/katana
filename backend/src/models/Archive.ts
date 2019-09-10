import { Document, model, Model, Schema } from 'mongoose';
import { SearchCriteria } from '../types';

interface ArchiveDocument extends Document {
  name: string;
  size: number;
  type: string;
  key: string;
  hash: string;
  updatedAt: Date;
  createdAt: Date;
}

interface ArchiveModel extends Model<ArchiveDocument> {
  list: (criteria: SearchCriteria) => Promise<ArchiveDocument[]>;
}

const archiveSchema = new Schema({
  name: String,
  size: Number,
  type: String,
  key: String,
  hash: String,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

archiveSchema.statics = {
  list(options: SearchCriteria = {}) {
    const { page = 0, perPage = 10000, ...criteria } = options;
    return this.find(criteria)
      .sort({ createdAt: -1 })
      .limit(perPage)
      .skip(perPage * page)
      .exec();
  },
};

export default model<ArchiveDocument, ArchiveModel>('Archive', archiveSchema);
