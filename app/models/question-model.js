const mongoose = require('mongoose');

let questionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    answers: {
        type: [{
            answer: String,
            correct: Boolean
        }],
        required: true
    },
    status: {
        type: String,
        enum: [
            'published',
            'unpublished'
        ],
        required: true
    }
});

module.exports = mongoose.model('question', questionSchema);