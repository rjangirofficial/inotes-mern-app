const mongoose = require('mongoose');


const notesSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model("notes", notesSchema)