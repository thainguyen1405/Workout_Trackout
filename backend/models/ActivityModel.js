const mongoose = require('mongoose')

const ActivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  startedAt: { type: Date, required: true },
  endedAt: { type: Date, default: Date.now() },
  distance: { type: String },
  movingTime: { type: String },
  avgPace: { type: String },
  isLive: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
})

const Activity = mongoose.model('Activity', ActivitySchema)
module.exports = Activity
