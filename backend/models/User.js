const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: Number,
  avatar: String,
  email: String,
  login: String,
  name: String,
  superUser: Boolean,
  stars: [{ type: Schema.Types.ObjectId, ref: 'Yume' }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'Yume' }],
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
