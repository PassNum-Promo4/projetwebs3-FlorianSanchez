const mongoose = require('mongoose')

const Schema = mongoose.Schema
const playerSchema = new Schema({
    pseudo: String,
    rank: String,
    language: String,
    mainchamp: String,
    ratio: String,
    creator: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('infoplayers', playerSchema);