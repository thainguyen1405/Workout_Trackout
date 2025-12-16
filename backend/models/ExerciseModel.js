const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  equipment: { type: String },
  primaryMuscles: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
})

const Exercise = mongoose.model('Exercise', ExerciseSchema)
module.exports = Exercise
