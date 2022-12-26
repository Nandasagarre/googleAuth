const mongoose = require('mongoose');

const { Schema } = mongoose;

const entry = new Schema({
    mail: {
        type: String,
        unique: true,
        required: true
    },
    pwd: {
        type: String,
        required: true
    }
})

const auths = mongoose.model('entry', entry);

module.exports = auths;
