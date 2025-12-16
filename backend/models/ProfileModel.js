const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  displayName: { type: String, required: true },
  avatarUrl: { type: String },
  bio: { type: String }, 
  homeLat: { type: String },
  homeLng: { type: String },
  gymName: { type: String },
  privacy: { type: String },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
})

const Profile = mongoose.model('Profile', ProfileSchema)
module.exports = Profile
