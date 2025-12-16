const mongoose = require('mongoose')

const PreferenceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  types: { type: [String], default: []},
  goals: { type: [String], default: []},
  preferredTimes: { type: [String], default: []},
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
})

const Preference = mongoose.model('Preference', PreferenceSchema)
module.exports = Preference
