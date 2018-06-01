const mongoose = require('mongoose')

const Schema = mongoose.Schema
const playerSchema = new Schema({
    pseudo: String,
    rank: String,
    server: String,
    mainchamp: String,
    role: String,
    creator: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('infoplayers', playerSchema);