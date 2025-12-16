const mongoose = require('mongoose')

const TemplateExerciseSchema = new mongoose.Schema({
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkoutTemplate',
        required: true
    },
    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true
    },
    orderIndex: {
        type: Number,
        required: true
    },
    defaultSets: {
        type: Number,
        default: 3
    },
    defaultReps: {
        type: Number,
        default: 10
    },
    defaultWeight: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model('TemplateExercise', TemplateExerciseSchema)