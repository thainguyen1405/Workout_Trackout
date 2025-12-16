const mongoose = require('mongoose');

const WorkoutTemplateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    visibility: {
        type: String,
        enum: ['public', 'friends', 'private'],
        default: 'private'
    }
}, { timestamps: true
})

module.exports = mongoose.model('WorkoutTemplate', WorkoutTemplateSchema)