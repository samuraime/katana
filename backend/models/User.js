const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  githubID: Number,
  avatar: String,
  email: String,
  login: String,
  name: String,
  superUser: Boolean,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
