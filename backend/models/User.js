const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: Number,
  avatar: String,
  email: String,
  login: String,
  name: String,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
