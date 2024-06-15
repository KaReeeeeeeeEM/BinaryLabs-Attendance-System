const mongoose = require('mongoose');

const students = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

mongoose.model("students", students);

module.exports = students
