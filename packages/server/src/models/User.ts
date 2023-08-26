import { Document, model, Schema } from 'mongoose';

export interface UserDocument extends Document {
  githubID: number;
  avatar: string;
  email: string;
  login: string;
  name: string;
  superUser: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema({
  githubID: Number,
  avatar: String,
  email: String,
  login: String,
  name: String,
  superUser: Boolean,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export default model<UserDocument>('User', userSchema);
